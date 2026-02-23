import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const TOPICS = [
  'Mixed Reality','Media Art','Mobility Design','LLM','Multi-agent',
  'User Experience','Ergonomics','CAE','Product Design','Experiment Design',
  'Game','Augmented Reality','Service Design','Hackathon','Philosophy','Virtual Reality'
]

export const STATUSES = ['Done', 'In-progress', 'Not started'] as const
