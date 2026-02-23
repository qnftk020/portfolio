'use client'
import { useState, useEffect } from 'react'
import { supabase, TOPICS, STATUSES } from '@/lib/supabase'

type Project = {
  id: string; slug: string; title: string; year: number
  status: string; topic: string[]; summary: string
  cover_url: string | null; featured: boolean; sort_order: number
}
type Block = {
  id?: string; project_id?: string
  type: 'text' | 'image' | 'video'
  content: string; caption: string; sort_order: number
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [selected, setSelected] = useState<Project | null>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [saving, setSaving] = useState(false)
  const [rebuilding, setRebuilding] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('admin_authed') === '1') {
      setAuthed(true); loadProjects()
    }
  }, [])

  async function login() {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      sessionStorage.setItem('admin_authed', '1')
      sessionStorage.setItem('admin_pw', pw)
      setAuthed(true); loadProjects()
    } else {
      setMsg('비밀번호가 틀렸어요')
    }
  }

  async function loadProjects() {
    const { data } = await supabase.from('projects').select('*').order('year', { ascending: false })
    setProjects(data ?? [])
  }

  async function selectProject(p: Project) {
    setSelected(p)
    const { data } = await supabase.from('project_blocks').select('*').eq('project_id', p.id).order('sort_order')
    setBlocks(data ?? [])
    setMsg('')
  }

  function newProject() {
    setSelected({ id: '', slug: '', title: '', year: new Date().getFullYear(), status: 'Not started', topic: [], summary: '', cover_url: null, featured: false, sort_order: 0 })
    setBlocks([])
    setMsg('')
  }

  async function saveProject() {
    if (!selected) return
    setSaving(true)
    try {
      let projectId = selected.id
      if (!projectId) {
        const { data, error } = await supabase.from('projects').insert([{
          slug: selected.slug, title: selected.title, year: selected.year,
          status: selected.status, topic: selected.topic, summary: selected.summary,
          cover_url: selected.cover_url, featured: selected.featured, sort_order: selected.sort_order
        }]).select().single()
        if (error) throw error
        projectId = data.id
        setSelected({ ...selected, id: projectId })
      } else {
        const { error } = await supabase.from('projects').update({
          slug: selected.slug, title: selected.title, year: selected.year,
          status: selected.status, topic: selected.topic, summary: selected.summary,
          cover_url: selected.cover_url, featured: selected.featured, sort_order: selected.sort_order
        }).eq('id', projectId)
        if (error) throw error
      }
      await supabase.from('project_blocks').delete().eq('project_id', projectId)
      if (blocks.length > 0) {
        await supabase.from('project_blocks').insert(
          blocks.map((b, i) => ({ project_id: projectId, type: b.type, content: b.content, caption: b.caption, sort_order: i }))
        )
      }
      setMsg('저장됐어요! ✓')
      loadProjects()
    } catch (e: any) {
      setMsg('에러: ' + e.message)
    }
    setSaving(false)
  }

  async function deleteProject(id: string) {
    if (!confirm('삭제할까요?')) return
    await supabase.from('project_blocks').delete().eq('project_id', id)
    await supabase.from('projects').delete().eq('id', id)
    setSelected(null); setBlocks([]); loadProjects()
  }

  async function uploadFile(file: File) {
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('media').upload(path, file)
    if (error) { setMsg('업로드 실패: ' + error.message); return null }
    const { data } = supabase.storage.from('media').getPublicUrl(path)
    return data.publicUrl
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !selected) return
    setMsg('업로드 중...')
    const url = await uploadFile(file)
    if (url) { setSelected({ ...selected, cover_url: url }); setMsg('커버 업로드 완료 ✓') }
  }

  async function handleBlockFile(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const file = e.target.files?.[0]
    if (!file) return
    const type: 'image' | 'video' = file.type.startsWith('video') ? 'video' : 'image'
    setMsg('업로드 중...')
    const url = await uploadFile(file)
    if (url) {
      const n = [...blocks]; n[idx] = { ...n[idx], type, content: url }
      setBlocks(n); setMsg('업로드 완료 ✓')
    }
  }

  async function rebuild() {
    if (!confirm('배포할까요? 약 5분 걸려요.')) return
    setRebuilding(true)
    const savedPw = sessionStorage.getItem('admin_pw') ?? ''
    const res = await fetch('/api/rebuild', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: savedPw }),
    })
    if (res.ok) setMsg('배포 시작됐어요! 약 5분 후 반영돼요 🚀')
    else setMsg('배포 실패. GitHub Token 확인해주세요.')
    setRebuilding(false)
  }

  if (!authed) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm w-80">
        <h1 className="text-xl font-semibold mb-1 text-gray-800">Portfolio Admin</h1>
        <p className="text-sm text-gray-400 mb-6">비밀번호로 로그인하세요</p>
        <input type="password" placeholder="비밀번호" value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-gray-400" />
        <button onClick={login} className="w-full bg-gray-900 text-white rounded-lg px-3 py-2 text-sm hover:bg-gray-700 transition-colors">로그인</button>
        {msg && <p className="text-red-500 text-xs mt-3">{msg}</p>}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h1 className="font-semibold text-gray-800 text-sm">Portfolio Admin</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <button onClick={newProject} className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg mb-1 transition-colors">
            + 새 프로젝트
          </button>
          {projects.map(p => (
            <button key={p.id} onClick={() => selectProject(p)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg mb-0.5 transition-colors ${selected?.id === p.id ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}>
              <div className="truncate text-gray-800">{p.title || '(제목 없음)'}</div>
              <div className="text-xs text-gray-400">{p.year} · {p.status}</div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-gray-100">
          <button onClick={rebuild} disabled={rebuilding}
            className="w-full bg-gray-900 text-white rounded-lg px-3 py-2 text-sm hover:bg-gray-700 disabled:opacity-50 transition-colors">
            {rebuilding ? '배포 중...' : '🚀 배포하기'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {msg && (
          <div className="sticky top-0 z-10 mx-6 mt-4 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg flex justify-between items-center shadow-sm">
            <span>{msg}</span>
            <button onClick={() => setMsg('')} className="ml-4 text-blue-400 hover:text-blue-600">×</button>
          </div>
        )}

        {!selected ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            왼쪽에서 프로젝트를 선택하거나 새로 만들어요
          </div>
        ) : (
          <div className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">{selected.id ? '프로젝트 편집' : '새 프로젝트'}</h2>
              <div className="flex gap-2">
                {selected.id && (
                  <button onClick={() => deleteProject(selected.id)} className="px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">삭제</button>
                )}
                <button onClick={saveProject} disabled={saving}
                  className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors">
                  {saving ? '저장 중...' : '저장'}
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">제목</label>
                  <input value={selected.title} onChange={e => setSelected({ ...selected, title: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Slug (URL용)</label>
                  <input value={selected.slug} onChange={e => setSelected({ ...selected, slug: e.target.value })}
                    placeholder="golden-capsule"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">연도</label>
                  <input type="number" value={selected.year} onChange={e => setSelected({ ...selected, year: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">상태</label>
                  <select value={selected.status} onChange={e => setSelected({ ...selected, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 bg-white">
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={selected.featured}
                  onChange={e => setSelected({ ...selected, featured: e.target.checked })}
                  className="w-4 h-4 rounded" />
                <label htmlFor="featured" className="text-sm text-gray-700">Featured 프로젝트로 표시</label>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">태그</label>
                <div className="flex flex-wrap gap-1.5">
                  {TOPICS.map(t => (
                    <button key={t} type="button"
                      onClick={() => {
                        const has = selected.topic.includes(t)
                        setSelected({ ...selected, topic: has ? selected.topic.filter(x => x !== t) : [...selected.topic, t] })
                      }}
                      className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${selected.topic.includes(t) ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">한 줄 요약</label>
                <input value={selected.summary} onChange={e => setSelected({ ...selected, summary: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">커버 이미지</label>
                {selected.cover_url && (
                  <div className="relative mb-2 group w-fit">
                    <img src={selected.cover_url} className="w-40 h-24 object-cover rounded-lg border border-gray-200" />
                    <button onClick={() => setSelected({ ...selected, cover_url: null })}
                      className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 text-xs text-gray-500 hover:text-red-500 shadow hidden group-hover:flex items-center justify-center">×</button>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleCoverUpload} className="text-sm text-gray-600" />
              </div>

              {/* Content blocks */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs text-gray-500">콘텐츠 블록</label>
                  <div className="flex gap-2">
                    {(['text', 'image', 'video'] as const).map(type => (
                      <button key={type} type="button"
                        onClick={() => setBlocks([...blocks, { type, content: '', caption: '', sort_order: blocks.length }])}
                        className="text-xs px-2.5 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                        + {type === 'text' ? '텍스트' : type === 'image' ? '이미지' : '영상'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {blocks.map((b, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex gap-2 items-center">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{b.type}</span>
                          {i > 0 && <button onClick={() => { const n=[...blocks]; [n[i-1],n[i]]=[n[i],n[i-1]]; setBlocks(n) }} className="text-xs text-gray-400 hover:text-gray-600">↑</button>}
                          {i < blocks.length-1 && <button onClick={() => { const n=[...blocks]; [n[i],n[i+1]]=[n[i+1],n[i]]; setBlocks(n) }} className="text-xs text-gray-400 hover:text-gray-600">↓</button>}
                        </div>
                        <button onClick={() => setBlocks(blocks.filter((_, j) => j !== i))} className="text-xs text-red-400 hover:text-red-600">삭제</button>
                      </div>
                      {b.type === 'text' ? (
                        <textarea value={b.content}
                          onChange={e => { const n = [...blocks]; n[i] = { ...b, content: e.target.value }; setBlocks(n) }}
                          rows={4} placeholder="텍스트 입력..."
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none" />
                      ) : (
                        <div>
                          {b.content && (b.type === 'image'
                            ? <img src={b.content} className="w-full h-36 object-cover rounded-lg mb-3 border border-gray-200" />
                            : <video src={b.content} className="w-full h-36 object-cover rounded-lg mb-3" controls />
                          )}
                          <input type="file" accept={b.type === 'image' ? 'image/*' : 'video/*'}
                            onChange={e => handleBlockFile(e, i)}
                            className="text-sm text-gray-600 mb-3 block" />
                          <input value={b.caption}
                            onChange={e => { const n = [...blocks]; n[i] = { ...b, caption: e.target.value }; setBlocks(n) }}
                            placeholder="캡션 (선택사항)"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                  {blocks.length === 0 && (
                    <div className="text-center py-8 text-gray-300 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                      블록을 추가해주세요
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
