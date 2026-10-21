-- Anti-spam: hash de IP para limitar envíos y newsletter solo vía api/subscribe.ts
alter table public.contacts add column if not exists ip_hash text;
create index if not exists contacts_ip_recent_idx on public.contacts (ip_hash, created_at desc);

alter table public.newsletter_subscribers add column if not exists ip_hash text;
create index if not exists newsletter_ip_recent_idx on public.newsletter_subscribers (ip_hash, created_at desc);

-- Antes cualquiera con la clave pública podía insertar suscriptores (los bots también).
-- Ahora solo se inserta desde la Vercel Function con la secret key, después de pasar Turnstile.
drop policy if exists "newsletter_public_insert" on public.newsletter_subscribers;
