import { NextResponse } from 'next/server'

export async function POST() {
  const token = process.env.GITHUB_PAT
  const repo = process.env.GITHUB_REPO // e.g. "username/portfolio"

  if (!token || !repo) {
    return NextResponse.json({ error: 'GITHUB_PAT or GITHUB_REPO not set' }, { status: 500 })
  }

  const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event_type: 'rebuild' }),
  })

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: text }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
