import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  const res = await fetch(`https://api.github.com/repos/${repo}/actions/workflows/deploy.yml/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ref: 'main' }),
  })
  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: text }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
