/**
 * fetch-notion.mjs
 *
 * 빌드 타임에 실행 → Notion API 에서 포트폴리오 프로젝트 데이터를 가져와
 * 이미지를 public/projects/{slug}/images/ 에 다운로드하고
 * data/notion-projects.json 을 생성합니다.
 *
 * Usage: node scripts/fetch-notion.mjs
 * Requires: NOTION_TOKEN env variable
 */

import { Client } from '@notionhq/client'
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// ─── Notion Database ID (Portfolio Projects) ───────────────
const DATABASE_ID = '15cb9819-2592-80fd-abe3-dc54f0309bfa'

// ─── Topic → slug 정규화 함수 ───────────────────────────────
function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// ─── 연도 파싱 (title에서 추출) ─────────────────────────────
function parseYear(title) {
  const m = title.match(/\((\d{4})\)/)
  return m ? parseInt(m[1]) : 2024
}

// ─── 파일 다운로드 ─────────────────────────────────────────
async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const file = fs.createWriteStream(dest)
    const protocol = url.startsWith('https') ? https : http

    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        file.close()
        return reject(new Error(`Download failed: ${res.statusCode} for ${url}`))
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', (err) => {
      fs.unlink(dest, () => {})
      reject(err)
    })
  })
}

// ─── Notion 블록 → ContentBlock[] 변환 ─────────────────────
async function parseBlocks(notion, blocks, slug, imageCounter) {
  const content = []

  for (const block of blocks) {
    const type = block.type

    // 제목 (heading_1, 2, 3)
    if (type === 'heading_1' || type === 'heading_2' || type === 'heading_3') {
      const level = type === 'heading_1' ? 1 : type === 'heading_2' ? 2 : 3
      const text = block[type].rich_text.map(r => r.plain_text).join('')
      if (text) content.push({ type: 'heading', level, text })
    }

    // 단락
    else if (type === 'paragraph') {
      const text = block.paragraph.rich_text.map(r => r.plain_text).join('')
      if (text) {
        // YouTube URL 감지
        const ytMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
        if (ytMatch) {
          content.push({ type: 'youtube', videoId: ytMatch[1] })
        } else {
          content.push({ type: 'text', text })
        }
      }
    }

    // bulleted / numbered list
    else if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      const text = block[type].rich_text.map(r => r.plain_text).join('')
      if (text) content.push({ type: 'text', text: `• ${text}` })
    }

    // 이미지
    else if (type === 'image') {
      const imgData = block.image
      const url = imgData.type === 'external' ? imgData.external.url
                : imgData.type === 'file'     ? imgData.file.url
                : null
      const caption = imgData.caption?.map(r => r.plain_text).join('') || ''

      if (url) {
        const idx = String(imageCounter.value).padStart(2, '0')
        imageCounter.value++
        const ext = url.split('?')[0].split('.').pop()?.toLowerCase() || 'jpg'
        const safeExt = ['jpg','jpeg','png','gif','webp'].includes(ext) ? ext : 'jpg'
        const filename = `${idx}.${safeExt}`
        const localPath = path.join(ROOT, 'public', 'projects', slug, 'images', filename)
        const publicPath = `/projects/${slug}/images/${filename}`

        try {
          await downloadFile(url, localPath)
          console.log(`  ✓ image saved: ${publicPath}`)
          content.push({ type: 'image', url: publicPath, ...(caption && { caption }) })
        } catch (e) {
          console.warn(`  ✗ image download failed: ${e.message}`)
          content.push({ type: 'image', url: publicPath, ...(caption && { caption }) })
        }
      }
    }

    // 비디오 (Notion 파일 첨부)
    else if (type === 'video') {
      const vidData = block.video
      const url = vidData.type === 'external' ? vidData.external.url
                : vidData.type === 'file'     ? vidData.file.url
                : null
      const caption = vidData.caption?.map(r => r.plain_text).join('') || ''

      if (url) {
        // YouTube embed인지 확인
        const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
        if (ytMatch) {
          content.push({ type: 'youtube', videoId: ytMatch[1], ...(caption && { caption }) })
        } else if (url.startsWith('https://prod-files-secure.s3')) {
          // Notion S3 파일 — URL만 저장 (signed URL이라 만료됨, 실제 파일은 별도 관리)
          const idx = String(imageCounter.value).padStart(2, '0')
          imageCounter.value++
          const videoPath = `/projects/${slug}/videos/${idx}.mp4`
          const localPath = path.join(ROOT, 'public', 'projects', slug, 'videos', `${idx}.mp4`)
          try {
            await downloadFile(url, localPath)
            console.log(`  ✓ video saved: ${videoPath}`)
            content.push({ type: 'video', url: videoPath, ...(caption && { caption }) })
          } catch (e) {
            console.warn(`  ✗ video download failed: ${e.message}`)
          }
        }
      }
    }

    // 토글 (자식 블록 재귀 처리)
    else if (type === 'toggle' && block.has_children) {
      try {
        const children = await notion.blocks.children.list({ block_id: block.id })
        const childContent = await parseBlocks(notion, children.results, slug, imageCounter)
        content.push(...childContent)
      } catch (e) {
        console.warn(`  ✗ toggle children fetch failed: ${e.message}`)
      }
    }

    // column_list (컬럼 레이아웃)
    else if (type === 'column_list' && block.has_children) {
      try {
        const cols = await notion.blocks.children.list({ block_id: block.id })
        for (const col of cols.results) {
          if (col.has_children) {
            const colBlocks = await notion.blocks.children.list({ block_id: col.id })
            const colContent = await parseBlocks(notion, colBlocks.results, slug, imageCounter)
            content.push(...colContent)
          }
        }
      } catch (e) {
        console.warn(`  ✗ column fetch failed: ${e.message}`)
      }
    }

    // 그 외 자식 블록 있는 경우 재귀
    else if (block.has_children) {
      try {
        const children = await notion.blocks.children.list({ block_id: block.id })
        const childContent = await parseBlocks(notion, children.results, slug, imageCounter)
        content.push(...childContent)
      } catch (e) {}
    }
  }

  return content
}

// ─── 메인 ───────────────────────────────────────────────────
async function main() {
  const token = process.env.NOTION_TOKEN
  if (!token) {
    console.warn('⚠️  NOTION_TOKEN not set — skipping Notion fetch, using existing notion-projects.json')
    process.exit(0)
  }

  const notion = new Client({ auth: token })
  console.log('🔗  Connected to Notion API')

  // 1. 데이터베이스에서 모든 프로젝트 가져오기
  console.log('📋  Fetching projects from database...')
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [{ property: 'Name', direction: 'ascending' }],
  })

  const projects = []

  for (const page of response.results) {
    const props = page.properties

    // 제목
    const rawTitle = props['Name']?.title?.map(r => r.plain_text).join('') || 'Untitled'
    const title = rawTitle.replace(/\s*\(\d{4}\)\s*$/, '').trim()
    const year = parseYear(rawTitle)

    // slug — 기존 slug 매핑 (수동 지정)
    const slugMap = {
      'Hyper Last Will': 'hyper-last-will',
      'SophyBARA': 'sophybara',
      'Paw Pulse': 'paw-pulse',
      'Jumanji AR': 'jumanji-ar',
      'Minwon 99': 'minwon-99',
      'SeeTheMusic : VR/AR Music Responsive Media Art': 'see-the-music',
      'Doccia': 'doccia',
      '[Tech for Impact] Rolling Pizza': 'rolling-pizza',
      'Conference AR': 'conference-ar',
      '[Graduation Project] Golden Capsule': 'golden-capsule',
      'Gyroscope + Kickboard': 'gyroscope-kickboard',
    }
    const slug = slugMap[title] || toSlug(title)

    // topic
    const topic = props['Topic']?.multi_select?.map(t => t.name) || []

    // status
    const statusRaw = props['Status']?.status?.name || 'Not started'
    const status = statusRaw === 'Done' ? 'Done'
                 : statusRaw === 'In progress' ? 'In-progress'
                 : 'Not started'

    // paper links
    const paper1 = props['Paper 1']?.url || null
    const paper2 = props['Paper 2']?.url || null

    // authors
    const authors = props['Author']?.rich_text?.map(r => r.plain_text).join('') || ''

    console.log(`\n📄  [${year}] ${title} (${slug})`)

    // 2. 페이지 블록 가져오기
    let blocks = []
    try {
      const blocksRes = await notion.blocks.children.list({
        block_id: page.id,
        page_size: 100,
      })
      blocks = blocksRes.results

      // 페이지네이션
      let cursor = blocksRes.next_cursor
      while (cursor) {
        const more = await notion.blocks.children.list({
          block_id: page.id,
          page_size: 100,
          start_cursor: cursor,
        })
        blocks = blocks.concat(more.results)
        cursor = more.next_cursor
      }
    } catch (e) {
      console.warn(`  ✗ blocks fetch failed: ${e.message}`)
    }

    // 3. 블록 → ContentBlock[] 변환 (이미지 다운로드 포함)
    const imageCounter = { value: 1 }
    const content = await parseBlocks(notion, blocks, slug, imageCounter)

    // 4. coverUrl = 첫 번째 이미지
    const firstImage = content.find(b => b.type === 'image')
    const coverUrl = firstImage ? firstImage.url : null

    projects.push({
      slug,
      title,
      year,
      status,
      topic,
      summary: '',  // 필요시 수동 추가
      coverUrl,
      featured: ['hyper-last-will', 'sophybara', 'golden-capsule', 'minwon-99'].includes(slug),
      ...(authors && { authors }),
      ...(paper1 && { paper: paper1 }),
      content,
    })
  }

  // 5. JSON 저장
  const outputPath = path.join(ROOT, 'data', 'notion-projects.json')
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2), 'utf-8')
  console.log(`\n✅  Saved ${projects.length} projects to data/notion-projects.json`)
}

main().catch((err) => {
  console.error('❌  Error:', err)
  process.exit(1)
})
