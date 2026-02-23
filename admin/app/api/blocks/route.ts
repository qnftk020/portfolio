import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { error, data } = await supabaseAdmin.from('project_blocks').insert([body]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  const blocks = await req.json() // array of blocks with id
  for (const block of blocks) {
    const { id, ...rest } = block
    await supabaseAdmin.from('project_blocks').update(rest).eq('id', id)
  }
  return NextResponse.json({ ok: true })
}
