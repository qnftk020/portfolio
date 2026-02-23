const DATABASE_ID = 'ad8f4454df954a6da5d68f1cc5a24fd0'

export type ProjectStatus = 'Done' | 'In-progress' | 'Not started'

export interface NotionProject {
  id: string
  slug: string
  title: string
  year: number
  status: ProjectStatus
  topic: string[]
  summary: string
  cover: string | null
  featured: boolean
  blocks: NotionBlock[]
}

export type NotionBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading_1'; text: string }
  | { type: 'heading_2'; text: string }
  | { type: 'heading_3'; text: string }
  | { type: 'image'; url: string; caption: string }
  | { type: 'video'; url: string; caption: string }

async function notionFetch(endpoint: string, body?: object) {
  const res = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Notion API error: ${res.status}`)
  return res.json()
}

function extractText(richText: any[]): string {
  return richText?.map((t: any) => t.plain_text).join('') ?? ''
}

function parseProject(page: any): NotionProject {
  const props = page.properties
  const coverFiles = props.Cover?.files ?? []
  let cover: string | null = null
  if (coverFiles.length > 0) {
    const f = coverFiles[0]
    cover = f.type === 'external' ? f.external.url : f.file?.url ?? null
  }
  return {
    id: page.id,
    slug: extractText(props.Slug?.rich_text ?? []),
    title: extractText(props.Title?.title ?? []),
    year: props.Year?.number ?? 0,
    status: (props.Status?.select?.name ?? 'Done') as ProjectStatus,
    topic: props.Topic?.multi_select?.map((t: any) => t.name) ?? [],
    summary: extractText(props.Summary?.rich_text ?? []),
    cover,
    featured: props.Featured?.checkbox ?? false,
    blocks: [],
  }
}

async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  const data = await notionFetch(`/blocks/${pageId}/children`)
  const blocks: NotionBlock[] = []

  for (const block of data.results) {
    const type = block.type
    if (type === 'paragraph') {
      const text = extractText(block.paragraph.rich_text)
      if (text) blocks.push({ type: 'paragraph', text })
    } else if (type === 'heading_1') {
      blocks.push({ type: 'heading_1', text: extractText(block.heading_1.rich_text) })
    } else if (type === 'heading_2') {
      blocks.push({ type: 'heading_2', text: extractText(block.heading_2.rich_text) })
    } else if (type === 'heading_3') {
      blocks.push({ type: 'heading_3', text: extractText(block.heading_3.rich_text) })
    } else if (type === 'image') {
      const img = block.image
      const url = img.type === 'external' ? img.external.url : img.file?.url ?? ''
      const caption = extractText(img.caption ?? [])
      if (url) blocks.push({ type: 'image', url, caption })
    } else if (type === 'video') {
      const vid = block.video
      const url = vid.type === 'external' ? vid.external.url : vid.file?.url ?? ''
      const caption = extractText(vid.caption ?? [])
      if (url) blocks.push({ type: 'video', url, caption })
    }
  }
  return blocks
}

export async function getProjects(): Promise<NotionProject[]> {
  const data = await notionFetch(`/databases/${DATABASE_ID}/query`, {
    sorts: [{ property: 'Year', direction: 'descending' }],
  })
  return data.results.map(parseProject)
}

export async function getProjectBySlug(slug: string): Promise<NotionProject | null> {
  const data = await notionFetch(`/databases/${DATABASE_ID}/query`, {
    filter: { property: 'Slug', rich_text: { equals: slug } },
  })
  if (!data.results.length) return null
  const project = parseProject(data.results[0])
  project.blocks = await getPageBlocks(data.results[0].id)
  return project
}

export async function getAllSlugs(): Promise<string[]> {
  const projects = await getProjects()
  return projects.map(p => p.slug).filter(Boolean)
}
