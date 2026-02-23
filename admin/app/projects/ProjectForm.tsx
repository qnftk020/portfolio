'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Project, ProjectBlock, ProjectStatus } from '@/lib/supabase'

const ALL_TOPICS = [
  'Mixed Reality','Media Art','Mobility Design','LLM','Multi-agent',
  'User Experience','Ergonomics','CAE','Product Design','Experiment Design',
  'Game','Augmented Reality','Service Design','Hackathon','Philosophy','Virtual Reality',
]

const STATUSES: ProjectStatus[] = ['Done', 'In-progress', 'Not started']

interface Props {
  project?: Project
  blocks?: ProjectBlock[]
}

export default function ProjectForm({ project, blocks: initialBlocks = [] }: Props) {
  const router = useRouter()
  const isNew = !project

  const [title, setTitle] = useState(project?.title ?? '')
  const [slug, setSlug] = useState(project?.slug ?? '')
  const [year, setYear] = useState(String(project?.year ?? new Date().getFullYear()))
  const [status, setStatus] = useState<ProjectStatus>(project?.status ?? 'Not started')
  const [topics, setTopics] = useState<string[]>(project?.topic ?? [])
  const [summary, setSummary] = useState(project?.summary ?? '')
  const [featured, setFeatured] = useState(project?.featured ?? false)
  const [coverUrl, setCoverUrl] = useState(project?.cover_url ?? '')
  const [blocks, setBlocks] = useState<(Omit<ProjectBlock, 'project_id'> & { isNew?: boolean })[]>(initialBlocks)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const coverInputRef = useRef<HTMLInputElement>(null)

  function toggleTopic(t: string) {
    setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  async function uploadImage(file: File): Promise<string | null> {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    setUploading(false)
    if (!res.ok) { setMsg('이미지 업로드 실패'); return null }
    const { url } = await res.json()
    return url
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadImage(file)
    if (url) setCoverUrl(url)
  }

  function addBlock(type: 'text' | 'image' | 'video') {
    setBlocks(prev => [...prev, {
      id: `new_${Date.now()}`,
      type,
      content: '',
      caption: '',
      sort_order: prev.length,
      isNew: true,
    }])
  }

  async function handleBlockImageUpload(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadImage(file)
    if (url) {
      setBlocks(prev => prev.map((b, i) => i === idx ? { ...b, content: url } : b))
    }
  }

  function updateBlock(idx: number, field: string, value: string) {
    setBlocks(prev => prev.map((b, i) => i === idx ? { ...b, [field]: value } : b))
  }

  function removeBlock(idx: number) {
    setBlocks(prev => prev.filter((_, i) => i !== idx))
  }

  function moveBlock(idx: number, dir: -1 | 1) {
    setBlocks(prev => {
      const arr = [...prev]
      const target = idx + dir
      if (target < 0 || target >= arr.length) return arr
      ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
      return arr
    })
  }

  async function handleSave() {
    setSaving(true)
    setMsg('')

    const projectData = {
      title, slug, year: parseInt(year), status,
      topic: topics, summary, featured,
      cover_url: coverUrl || null,
    }

    let projectId = project?.id

    if (isNew) {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      })
      if (!res.ok) { setMsg('저장 실패'); setSaving(false); return }
      const data = await res.json()
      projectId = data.id
    } else {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      })
      if (!res.ok) { setMsg('저장 실패'); setSaving(false); return }

      // Delete removed blocks
      const removedBlocks = initialBlocks.filter(ib => !blocks.find(b => b.id === ib.id))
      for (const rb of removedBlocks) {
        await fetch(`/api/blocks/${rb.id}`, { method: 'DELETE' })
      }
    }

    // Save blocks
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i]
      const blockData = { project_id: projectId, type: b.type, content: b.content, caption: b.caption, sort_order: i }
      if (b.isNew || b.id.startsWith('new_')) {
        await fetch('/api/blocks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blockData) })
      } else {
        await fetch('/api/blocks', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify([{ id: b.id, ...blockData }]) })
      }
    }

    setSaving(false)
    setMsg('저장 완료!')
    setTimeout(() => router.push('/'), 1000)
  }

  async function handleDelete() {
    if (!project || !confirm('정말 삭제하시겠습니까?')) return
    await fetch(`/api/projects/${project.id}`, { method: 'DELETE' })
    router.push('/')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold text-gray-900">{isNew ? '새 프로젝트' : '프로젝트 수정'}</h1>
        <button onClick={() => router.push('/')} className="text-sm text-gray-500 hover:text-gray-800">← 목록</button>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-medium text-gray-800">기본 정보</h2>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">제목</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Slug (URL)</label>
              <input value={slug} onChange={e => setSlug(e.target.value)}
                placeholder="golden-capsule"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">연도</label>
              <input value={year} onChange={e => setYear(e.target.value)} type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">상태</label>
            <select value={status} onChange={e => setStatus(e.target.value as ProjectStatus)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">요약</label>
            <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={featured} onChange={e => setFeatured(e.target.checked)}
              className="rounded" />
            <label htmlFor="featured" className="text-sm text-gray-700">Featured</label>
          </div>
        </div>

        {/* Topics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-3">토픽</h2>
          <div className="flex flex-wrap gap-2">
            {ALL_TOPICS.map(t => (
              <button key={t} onClick={() => toggleTopic(t)}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${
                  topics.includes(t) ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Cover image */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-3">커버 이미지</h2>
          {coverUrl && (
            <img src={coverUrl} alt="cover" className="w-full max-h-48 object-cover rounded-lg mb-3" />
          )}
          <div className="flex items-center gap-3">
            <input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} placeholder="이미지 URL 직접 입력"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={() => coverInputRef.current?.click()}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition whitespace-nowrap">
              {uploading ? '업로드 중...' : '파일 업로드'}
            </button>
            <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
          </div>
        </div>

        {/* Content blocks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4">콘텐츠</h2>
          <div className="space-y-4 mb-4">
            {blocks.map((block, idx) => (
              <div key={block.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase">{block.type}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => moveBlock(idx, -1)} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-sm">↑</button>
                    <button onClick={() => moveBlock(idx, 1)} disabled={idx === blocks.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-sm">↓</button>
                    <button onClick={() => removeBlock(idx)} className="text-red-400 hover:text-red-600 text-sm">삭제</button>
                  </div>
                </div>
                {block.type === 'text' ? (
                  <textarea value={block.content} onChange={e => updateBlock(idx, 'content', e.target.value)}
                    rows={4} placeholder="텍스트 입력..."
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
                ) : (
                  <div className="space-y-2">
                    {block.content && (
                      block.type === 'image'
                        ? <img src={block.content} alt="" className="w-full max-h-40 object-cover rounded" />
                        : <video src={block.content} className="w-full max-h-40 rounded" controls />
                    )}
                    <div className="flex gap-2">
                      <input value={block.content} onChange={e => updateBlock(idx, 'content', e.target.value)}
                        placeholder="URL 직접 입력"
                        className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {block.type === 'image' && (
                        <>
                          <button onClick={() => {
                            const input = document.createElement('input')
                            input.type = 'file'; input.accept = 'image/*'
                            input.onchange = (e) => handleBlockImageUpload(idx, e as any)
                            input.click()
                          }} className="px-3 py-2 border border-gray-200 rounded text-sm hover:bg-gray-50 whitespace-nowrap">
                            {uploading ? '...' : '업로드'}
                          </button>
                        </>
                      )}
                    </div>
                    <input value={block.caption} onChange={e => updateBlock(idx, 'caption', e.target.value)}
                      placeholder="캡션 (선택)"
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {(['text', 'image', 'video'] as const).map(type => (
              <button key={type} onClick={() => addBlock(type)}
                className="px-3 py-2 border border-dashed border-gray-300 text-gray-500 rounded-lg text-sm hover:border-gray-500 hover:text-gray-700 transition">
                + {type}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          {!isNew && (
            <button onClick={handleDelete} className="text-sm text-red-500 hover:text-red-700 transition">
              프로젝트 삭제
            </button>
          )}
          <div className="flex items-center gap-3 ml-auto">
            {msg && <span className={`text-sm ${msg.includes('실패') ? 'text-red-500' : 'text-green-600'}`}>{msg}</span>}
            <button onClick={handleSave} disabled={saving}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm hover:bg-gray-700 disabled:opacity-50 transition">
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
