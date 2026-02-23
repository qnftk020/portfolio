import { getProjectById, getProjectBlocks } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProjectForm from '../ProjectForm'

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id)
  if (!project) notFound()
  const blocks = await getProjectBlocks(params.id)
  return <ProjectForm project={project} blocks={blocks} />
}
