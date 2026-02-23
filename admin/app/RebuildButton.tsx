'use client'
import { useState } from 'react'

export default function RebuildButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function rebuild() {
    setStatus('loading')
    const res = await fetch('/api/rebuild', { method: 'POST' })
    setStatus(res.ok ? 'done' : 'error')
    setTimeout(() => setStatus('idle'), 3000)
  }

  const labels = { idle: '🔄 포트폴리오 배포', loading: '배포 중...', done: '✓ 배포 시작됨', error: '오류 발생' }
  const colors = { idle: 'bg-blue-600 hover:bg-blue-500', loading: 'bg-blue-400 cursor-not-allowed', done: 'bg-green-600', error: 'bg-red-600' }

  return (
    <button
      onClick={rebuild}
      disabled={status === 'loading'}
      className={`text-white px-4 py-2 rounded-lg text-sm transition ${colors[status]}`}
    >
      {labels[status]}
    </button>
  )
}
