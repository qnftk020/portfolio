// ============================================================
// 프로젝트 데이터 — 여기서 직접 수정하세요!
// ============================================================
//
// 📁 파일 구조 (public/projects/{slug}/ 안에 넣으면 됩니다)
//
//   public/projects/golden-capsule/
//     thumbnail.jpg       ← 카드 썸네일 (coverUrl)
//     images/
//       01.jpg            ← 상세 이미지
//       02.jpg
//     videos/
//       01.mp4            ← 상세 영상
//
// ============================================================

export type ProjectStatus = 'Done' | 'In-progress' | 'Not started'

export interface Project {
  slug: string
  title: string
  year: number
  status: ProjectStatus
  topic: string[]
  summary: string
  coverUrl: string | null   // 썸네일: /projects/{slug}/thumbnail.jpg
  featured: boolean
  content: ContentBlock[]
}

export type ContentBlock =
  | { type: 'text';  text: string }
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
    // coverUrl: '/projects/hyper-last-will/thumbnail.jpg',
    featured: true,
    content: [
      { type: 'text', text: 'Description coming soon.' },
      // { type: 'image', url: '/projects/hyper-last-will/images/01.jpg', caption: '캡션' },
      // { type: 'video', url: '/projects/hyper-last-will/videos/01.mp4' },
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
    // coverUrl: '/projects/sophybara/thumbnail.jpg',
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
    coverUrl: '/projects/golden-capsule/thumbnail.jpg',   // ← 예시 이미지 연결됨
    featured: true,
    content: [
      { type: 'text', text: 'Description coming soon.' },
      { type: 'image', url: '/projects/golden-capsule/images/01.jpg', caption: '예시 이미지' },
      // { type: 'video', url: '/projects/golden-capsule/videos/01.mp4' },
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
    // coverUrl: '/projects/minwon-99/thumbnail.jpg',
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
    // coverUrl: '/projects/paw-pulse/thumbnail.jpg',
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
    // coverUrl: '/projects/jumanji-ar/thumbnail.jpg',
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
    // coverUrl: '/projects/see-the-music/thumbnail.jpg',
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
    // coverUrl: '/projects/doccia/thumbnail.jpg',
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
    // coverUrl: '/projects/rolling-pizza/thumbnail.jpg',
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
    // coverUrl: '/projects/conference-ar/thumbnail.jpg',
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
    // coverUrl: '/projects/gyroscope-kickboard/thumbnail.jpg',
    featured: false,
    content: [
      { type: 'text', text: 'Description coming soon.' },
    ],
  },
]

export default projects
export const featuredProjects = projects.filter(p => p.featured)
export const allProjects = projects.filter(p => !p.featured)
