-- 1. Projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  year integer not null,
  status text not null default 'Not started',
  topic text[] default '{}',
  summary text default '',
  cover_url text,
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- 2. Project blocks table (text, image, video)
create table if not exists project_blocks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  type text not null, -- 'text' | 'image' | 'video'
  content text not null default '',
  caption text default '',
  sort_order integer default 0
);

-- 3. Enable public read access
alter table projects enable row level security;
alter table project_blocks enable row level security;

create policy "Public read projects" on projects for select using (true);
create policy "Public read blocks" on project_blocks for select using (true);
create policy "Service role all projects" on projects using (auth.role() = 'service_role');
create policy "Service role all blocks" on project_blocks using (auth.role() = 'service_role');

-- 4. Supabase Storage bucket for images
insert into storage.buckets (id, name, public)
values ('project-assets', 'project-assets', true)
on conflict do nothing;

create policy "Public read assets" on storage.objects
  for select using (bucket_id = 'project-assets');
create policy "Service upload assets" on storage.objects
  for insert with check (bucket_id = 'project-assets');
create policy "Service delete assets" on storage.objects
  for delete using (bucket_id = 'project-assets');

-- 5. Seed project data
insert into projects (slug, title, year, status, topic, summary, featured, sort_order) values
('hyper-last-will',    'Hyper Last Will',                              2026, 'Not started', '{"LLM","Multi-agent","Philosophy"}',           'An AI-assisted system for creating meaningful digital legacies.',          true,  1),
('sophybara',          'SophyBARA',                                    2025, 'In-progress', '{"LLM","Multi-agent","User Experience"}',       'A multi-agent philosophy tutor built with LLMs.',                          true,  2),
('paw-pulse',          'Paw Pulse',                                    2025, 'Done',        '{"User Experience","Service Design"}',          'A pet health monitoring service design project.',                          false, 3),
('jumanji-ar',         'Jumanji AR',                                   2025, 'Done',        '{"Augmented Reality","Game"}',                  'AR board game experience inspired by Jumanji.',                            false, 4),
('minwon99',           'Minwon 99',                                    2024, 'Done',        '{"User Experience","Service Design","Hackathon"}','Hackathon project improving public service accessibility.',               true,  5),
('see-the-music',      'SeeTheMusic : VR/AR Music Responsive Media Art',2024,'Done',        '{"Virtual Reality","Augmented Reality","Media Art"}','Immersive music visualization using VR/AR.',                          true,  6),
('doccia',             'Doccia',                                       2024, 'Done',        '{"Product Design","User Experience"}',          'Smart shower product design with user-centered research.',                 false, 7),
('rolling-pizza',      '[Tech for Impact] Rolling Pizza',              2024, 'Done',        '{"Service Design","Hackathon"}',                'Social impact hackathon project for accessible food delivery.',             false, 8),
('conference-ar',      'Conference AR',                                2024, 'Done',        '{"Augmented Reality","Mixed Reality"}',         'AR system enhancing conference and networking experiences.',                false, 9),
('golden-capsule',     '[Graduation Project] Golden Capsule',          2023, 'Done',        '{"Mixed Reality","Media Art","Experiment Design"}','Graduation project exploring memory and digital time capsules.',         true,  10),
('gyroscope-kickboard','Gyroscope + Kickboard',                        2022, 'Done',        '{"Mobility Design","Ergonomics","CAE"}',        'Kickboard stability improvement using gyroscope mechanism.',               false, 11)
on conflict (slug) do nothing;
