-- Backend Crubyt: usuarios del equipo (Google SSO @crubyt.com), permisos y contactos del formulario.
-- Ejecutar en Supabase → SQL Editor después de 20261021000000_init.sql.

-- ============================================================
-- 1. Admins iniciales (pueden autorizar al resto del equipo)
-- ============================================================
create table if not exists public.admin_bootstrap (
  email text primary key check (email like '%@crubyt.com')
);
alter table public.admin_bootstrap enable row level security; -- sin políticas: nadie la lee vía API

insert into public.admin_bootstrap (email) values ('sebastian.gravina@crubyt.com')
on conflict do nothing;

-- ============================================================
-- 2. Perfiles del equipo
-- ============================================================
create table if not exists public.profiles (
  id                uuid primary key references auth.users (id) on delete cascade,
  email             text not null unique,
  full_name         text,
  avatar_url        text,
  role              text not null default 'member' check (role in ('admin', 'member')),
  can_view_contacts boolean not null default false,
  approved_by       uuid references public.profiles (id),
  approved_at       timestamptz,
  created_at        timestamptz not null default now(),
  last_seen_at      timestamptz
);
alter table public.profiles enable row level security;

-- Alta automática al primer login. Bloquea cualquier cuenta fuera de @crubyt.com.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  is_boot boolean;
begin
  if new.email is null or lower(new.email) not like '%@crubyt.com' then
    raise exception 'Solo se permiten cuentas @crubyt.com';
  end if;
  select exists (select 1 from public.admin_bootstrap b where b.email = lower(new.email)) into is_boot;
  insert into public.profiles (id, email, full_name, avatar_url, role, can_view_contacts, approved_at)
  values (
    new.id,
    lower(new.email),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    case when is_boot then 'admin' else 'member' end,
    is_boot,
    case when is_boot then now() end
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- Helpers de permisos (security definer para evitar recursión de RLS)
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin' and p.email like '%@crubyt.com'
  );
$$;

create or replace function public.can_view_contacts() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and (p.can_view_contacts or p.role = 'admin') and p.email like '%@crubyt.com'
  );
$$;

-- Cada uno ve su perfil; los admins ven y editan todos.
drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_admin_update" on public.profiles;
create policy "profiles_admin_update" on public.profiles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "profiles_admin_delete" on public.profiles;
create policy "profiles_admin_delete" on public.profiles
  for delete to authenticated using (public.is_admin() and id <> auth.uid());

-- Un admin no puede quitarse a sí mismo el rol (evita quedarse sin admins).
create or replace function public.protect_self_admin() returns trigger
language plpgsql as $$
begin
  if old.id = auth.uid() and old.role = 'admin' and new.role <> 'admin' then
    raise exception 'No puedes quitarte tu propio rol de admin';
  end if;
  if new.email <> old.email then
    raise exception 'El email no se puede modificar';
  end if;
  return new;
end $$;

drop trigger if exists profiles_protect on public.profiles;
create trigger profiles_protect before update on public.profiles
for each row execute function public.protect_self_admin();

-- Registrar última actividad (lo llama el frontend al entrar)
create or replace function public.touch_last_seen() returns void
language sql security definer set search_path = public as $$
  update public.profiles set last_seen_at = now() where id = auth.uid();
$$;
grant execute on function public.touch_last_seen() to authenticated;

-- ============================================================
-- 3. Contactos del formulario web
-- ============================================================
create table if not exists public.contacts (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  nombres           text not null,
  apellidos         text,
  email             text not null,
  telefono          text,
  rol               text,
  empresa           text,
  url_empresa       text,
  ciudad            text,
  mensaje           text,
  page              text,
  status            text not null default 'nuevo' check (status in ('nuevo', 'contactado', 'calificado', 'descartado')),
  notes             text,
  email_sent        boolean not null default false,
  -- Integración futura con HubSpot
  hubspot_contact_id text,
  hubspot_synced_at  timestamptz,
  updated_at        timestamptz not null default now(),
  updated_by        uuid references public.profiles (id)
);
create index if not exists contacts_created_idx on public.contacts (created_at desc);
create index if not exists contacts_email_idx on public.contacts (lower(email));
create index if not exists contacts_hubspot_pending_idx on public.contacts (created_at) where hubspot_synced_at is null;

create or replace function public.contacts_touch() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  new.updated_by = coalesce(auth.uid(), new.updated_by);
  return new;
end $$;

drop trigger if exists contacts_touch on public.contacts;
create trigger contacts_touch before update on public.contacts
for each row execute function public.contacts_touch();

alter table public.contacts enable row level security;

-- Los inserts llegan solo desde api/contact.ts con la secret key (bypassa RLS).
-- Nadie con la clave pública puede leer ni insertar.
drop policy if exists "contacts_team_read" on public.contacts;
create policy "contacts_team_read" on public.contacts
  for select to authenticated using (public.can_view_contacts());

drop policy if exists "contacts_team_update" on public.contacts;
create policy "contacts_team_update" on public.contacts
  for update to authenticated using (public.can_view_contacts()) with check (public.can_view_contacts());

drop policy if exists "contacts_admin_delete" on public.contacts;
create policy "contacts_admin_delete" on public.contacts
  for delete to authenticated using (public.is_admin());

-- ============================================================
-- 4. Ajuste: escritura de posts solo para admins (antes: cualquier @crubyt.com)
-- ============================================================
drop policy if exists "posts_team_write" on public.posts;
create policy "posts_team_write" on public.posts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "newsletter_team_read" on public.newsletter_subscribers;
create policy "newsletter_team_read" on public.newsletter_subscribers
  for select to authenticated using (public.can_view_contacts());
