import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Service role client for admin writes
export const supabaseAdmin = createClient(url, serviceKey)

export type ProjectStatus = 'Done' | 'In-progress' | 'Not started'

export interface Project {
  id: string
  slug: string
  title: string
  year: number
  status: ProjectStatus
  topic: string[]
  summary: string
  cover_url: string | null
  featured: boolean
  sort_order: number
}

export interface ProjectBlock {
  id: string
  project_id: string
  type: 'text' | 'image' | 'video'
  content: string
  caption: string
  sort_order: number
}

export async function getProjects(): Promise<Project[]> {
  const { data } = await supabaseAdmin.from('projects').select('*').order('sort_order')
  return data ?? []
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data } = await supabaseAdmin.from('projects').select('*').eq('id', id).single()
  return data
}

export async function getProjectBlocks(projectId: string): Promise<ProjectBlock[]> {
  const { data } = await supabaseAdmin
    .from('project_blocks').select('*').eq('project_id', projectId).order('sort_order')
  return data ?? []
}
