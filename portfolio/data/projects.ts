// ============================================================
// 프로젝트 데이터 — 여기서 직접 수정하세요!
// ============================================================

export type ProjectStatus = 'Done' | 'In-progress' | 'Not started'

export interface Project {
  slug: string          // URL에 사용되는 ID (영문 소문자, 하이픈)
  title: string
  year: number
  status: ProjectStatus
  topic: string[]
  summary: string
  coverUrl: string | null  // 이미지 URL 또는 /images/파일명.jpg
  featured: boolean
  content: ContentBlock[]
}

export type ContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'video'; url: string; caption?: string }

const projects: Project[] = [

  // ─── FEATURED ─────────────────────────────────────────────
  {
    slug: 'hyper-last-will',
    title: 'Hyper Last Will',
    year: 2026,
    status: 'Not started',
    topic: ['LLM', 'Multi-agent', 'Philosophy'],
    summary: 'AI-powered legacy documentation system',
    coverUrl: null,
    featured: true,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
  {
    slug: 'sophybara',
    title: 'SophyBARA',
    year: 2025,
    status: 'In-progress',
    topic: ['LLM', 'User Experience'],
    summary: 'Conversational AI companion',
    coverUrl: null,
    featured: true,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
  {
    slug: 'golden-capsule',
    title: '[Graduation Project] Golden Capsule',
    year: 2023,
    status: 'Done',
    topic: ['Media Art', 'Mixed Reality'],
    summary: 'Interactive time capsule experience',
    coverUrl: null,
    featured: true,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
  {
    slug: 'minwon-99',
    title: 'Minwon 99',
    year: 2024,
    status: 'Done',
    topic: ['Service Design', 'User Experience'],
    summary: 'Civic service redesign project',
    coverUrl: null,
    featured: true,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },

  // ─── ALL ──────────────────────────────────────────────────
  {
    slug: 'paw-pulse',
    title: 'Paw Pulse',
    year: 2025,
    status: 'Done',
    topic: ['User Experience', 'Product Design'],
    summary: 'Pet health monitoring app',
    coverUrl: null,
    featured: false,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
  {
    slug: 'jumanji-ar',
    title: 'Jumanji AR',
    year: 2025,
    status: 'Done',
    topic: ['Augmented Reality', 'Game'],
    summary: 'AR-enhanced Jumanji board game experience',
    coverUrl: null,
    featured: false,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
  {
    slug: 'see-the-music',
    title: 'SeeTheMusic : VR/AR Music Responsive Media Art',
    year: 2024,
    status: 'Done',
    topic: ['Media Art', 'Virtual Reality', 'Augmented Reality'],
    summary: 'Music-reactive immersive media art installation',
    coverUrl: null,
    featured: false,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
  {
    slug: 'doccia',
    title: 'Doccia',
    year: 2024,
    status: 'Done',
    topic: ['Product Design', 'User Experience'],
    summary: 'Smart shower product design',
    coverUrl: null,
    featured: false,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
  {
    slug: 'rolling-pizza',
    title: '[Tech for Impact] Rolling Pizza',
    year: 2024,
    status: 'Done',
    topic: ['Service Design', 'Hackathon'],
    summary: 'Social impact pizza delivery service',
    coverUrl: null,
    featured: false,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
  {
    slug: 'conference-ar',
    title: 'Conference AR',
    year: 2024,
    status: 'Done',
    topic: ['Augmented Reality', 'Mixed Reality'],
    summary: 'AR-enhanced conference experience',
    coverUrl: null,
    featured: false,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
  {
    slug: 'gyroscope-kickboard',
    title: 'Gyroscope + Kickboard',
    year: 2022,
    status: 'Done',
    topic: ['Mobility Design', 'Ergonomics', 'CAE'],
    summary: 'Gyroscope-stabilized electric kickboard design',
    coverUrl: null,
    featured: false,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
]

export default projects
export const featuredProjects = projects.filter(p => p.featured)
export const allProjects = projects.filter(p => !p.featured)
