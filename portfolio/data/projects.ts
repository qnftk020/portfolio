// ============================================================
// 이 파일은 scripts/fetch-notion.mjs 가 생성한
// notion-projects.json 을 읽어서 타입을 붙여 export 합니다.
//
// ✏️  summary, featured 등 수동 오버라이드가 필요한 경우
//     이 파일 맨 아래 overrides 객체를 수정하세요.
// ============================================================

import rawProjects from './notion-projects.json'

export type ProjectStatus = 'Done' | 'In-progress' | 'Not started'

export type ContentBlock =
  | { type: 'text';    text: string }
  | { type: 'image';   url: string;     caption?: string }
  | { type: 'video';   url: string;     caption?: string }
  | { type: 'youtube'; videoId: string; caption?: string }
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'toggle';  title: string;   children: ContentBlock[] }

export interface Project {
  slug: string
  title: string
  year: number
  status: ProjectStatus
  topic: string[]
  summary: string
  coverUrl: string | null
  featured: boolean
  authors?: string
  paper?: string
  content: ContentBlock[]
}

// ─── 수동 보완 데이터 (Notion에 없는 summary / featured 등) ──
const overrides: Record<string, Partial<Project>> = {
  'hyper-last-will': {
    featured: true,
    summary: 'AI-powered multi-agent system for creating meaningful last wills and personal legacy documentation.',
  },
  'sophybara': {
    featured: true,
    summary: 'A multi-agent philosophy education platform — watch Plato and Nietzsche debate, then jump in yourself.',
  },
  'golden-capsule': {
    featured: true,
    summary: 'Non-powered hands-free IV pump for disaster rescue sites. James Dyson Award 2023 International Winner.',
  },
  'minwon-99': {
    featured: true,
    summary: 'LLM-based civil complaint platform: helps citizens draft, ranks similar cases, and moderates harmful content.',
  },
  'paw-pulse': {
    summary: 'AR + AI pet emotion tracker that reveals how your environment affects your pet throughout the day.',
  },
  'jumanji-ar': {
    summary: 'Hybrid MR board game blending AR visuals, gesture control, and Arduino hardware.',
  },
  'see-the-music': {
    summary: 'VR/AR exhibition that transforms music into visual form — see the bass, feel the rhythm.',
  },
  'doccia': {
    summary: 'Apple Vision Pro virtual docent using GPT API for comprehensive museum exhibit commentary.',
  },
  'rolling-pizza': {
    summary: 'Social impact game tackling food waste through playful mechanics. Tech for Impact Hackathon.',
  },
  'conference-ar': {
    summary: 'AR HMD + mobile hybrid system for conference environments — usability research in progress.',
  },
  'gyroscope-kickboard': {
    summary: 'CAE study proving gyroscopic effect stabilizes electric kick scooters on uneven terrain.',
  },
}

// notion-projects.json 이 아직 없을 때 빌드 에러 방지용 fallback
let notionData: unknown[] = []
try {
  notionData = rawProjects as unknown[]
} catch {
  notionData = []
}

const projects: Project[] = (notionData as Project[]).map((p) => ({
  ...p,
  ...(overrides[p.slug] ?? {}),
  summary: overrides[p.slug]?.summary ?? p.summary ?? '',
}))

export const featuredProjects = projects.filter(p => p.featured)
export const allProjects = projects

export default projects
