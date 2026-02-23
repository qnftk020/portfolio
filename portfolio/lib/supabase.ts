import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

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
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false })
  if (error) { console.error(error); return [] }
  return data ?? []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

export async function getProjectBlocks(projectId: string): Promise<ProjectBlock[]> {
  const { data, error } = await supabase
    .from('project_blocks')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true })
  if (error) { console.error(error); return [] }
  return data ?? []
}

export async function getAllSlugs(): Promise<string[]> {
  const { data } = await supabase.from('projects').select('slug')
  return data?.map(p => p.slug).filter(Boolean) ?? []
}
