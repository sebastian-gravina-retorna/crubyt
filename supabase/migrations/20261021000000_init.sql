-- Crubyt web: blog / casos de éxito + newsletter
-- Ejecutar en Supabase: SQL Editor (o `supabase db push`).

create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text not null default '',
  category      text not null default 'Casos de Éxito',
  client        text,
  type          text not null default 'blog' check (type in ('blog', 'caso')),
  cover_url     text,
  content_html  text not null default '',
  published     boolean not null default true,
  published_at  date not null default current_date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (published, published_at desc);

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
for each row execute function public.touch_updated_at();

alter table public.posts enable row level security;

-- Lectura pública solo de lo publicado. La escritura se hace desde el dashboard
-- de Supabase (service role) o usuarios autenticados del equipo.
drop policy if exists "posts_public_read" on public.posts;
create policy "posts_public_read" on public.posts
  for select to anon, authenticated using (published = true);

drop policy if exists "posts_team_write" on public.posts;
create policy "posts_team_write" on public.posts
  for all to authenticated
  using ((auth.jwt() ->> 'email') like '%@crubyt.com')
  with check ((auth.jwt() ->> 'email') like '%@crubyt.com');

-- Newsletter
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 254),
  source      text check (length(source) <= 200),
  created_at  timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- El público puede suscribirse (insert) pero nunca leer la lista.
drop policy if exists "newsletter_public_insert" on public.newsletter_subscribers;
create policy "newsletter_public_insert" on public.newsletter_subscribers
  for insert to anon, authenticated with check (true);

drop policy if exists "newsletter_team_read" on public.newsletter_subscribers;
create policy "newsletter_team_read" on public.newsletter_subscribers
  for select to authenticated using ((auth.jwt() ->> 'email') like '%@crubyt.com');
