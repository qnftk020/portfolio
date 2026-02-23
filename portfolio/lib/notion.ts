// Notion CMS - Portfolio Projects
// Database ID: ad8f4454df954a6da5d68f1cc5a24fd0

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
  description: string
  cover: string | null
  featured: boolean
}

async function notionFetch(endpoint: string, body?: object) {
  const res = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 60 }, // ISR: 60초마다 갱신
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
    const file = coverFiles[0]
    cover = file.type === 'external' ? file.external.url : file.file?.url ?? null
  }

  return {
    id: page.id,
    slug: extractText(props.Slug?.rich_text ?? []),
    title: extractText(props.Title?.title ?? []),
    year: props.Year?.number ?? 0,
    status: (props.Status?.select?.name ?? 'Done') as ProjectStatus,
    topic: props.Topic?.multi_select?.map((t: any) => t.name) ?? [],
    summary: extractText(props.Summary?.rich_text ?? []),
    description: extractText(props.Description?.rich_text ?? []),
    cover,
    featured: props.Featured?.checkbox ?? false,
  }
}

export async function getProjects(): Promise<NotionProject[]> {
  const data = await notionFetch(`/databases/${DATABASE_ID}/query`, {
    sorts: [{ property: 'Year', direction: 'descending' }],
  })

  return data.results.map(parseProject)
}

export async function getProjectBySlug(slug: string): Promise<NotionProject | null> {
  const data = await notionFetch(`/databases/${DATABASE_ID}/query`, {
    filter: {
      property: 'Slug',
      rich_text: { equals: slug },
    },
  })

  if (!data.results.length) return null
  return parseProject(data.results[0])
}

export async function getAllSlugs(): Promise<string[]> {
  const projects = await getProjects()
  return projects.map(p => p.slug).filter(Boolean)
}
