# Crubyt Web

Sitio institucional de **Crubyt** — React 18 + Vite + TypeScript + Tailwind CSS, con Supabase para blog/casos de éxito y newsletter.
Reemplaza el sitio WordPress/PHP actual: el contenido, logos, colores y secciones fueron migrados desde crubyt.com.

## Desarrollo

```bash
npm install
cp .env.example .env   # opcional: completar Supabase y Resend
npm run dev            # http://localhost:5173
npm run build          # genera dist/ (sitio estático)
```

Sin variables de Supabase el blog usa `src/content/posts.json`. El formulario de contacto necesita `RESEND_API_KEY` en Vercel.

## Estructura

```
src/
  content/      Textos editables: site.ts (home, equipo, clientes…), services.ts, industries.ts, posts.json
  components/   Header, Footer, Newsletter, bloques reutilizables (hero, formularios, cards)
  pages/        Home, ServicePage (plantilla de los 4 servicios), IndustryPage (4 industrias), Nosotros,
                Cómo trabajamos, Blog/Casos, Post, Eventos, Contacto, Privacidad, 404
  lib/          supabase.ts, posts.ts (Supabase con fallback local), forms.ts (newsletter + contacto)
api/            contact.ts (contacto → Supabase + Resend), subscribe.ts (newsletter), _antispam.ts
src/admin/      Backend /admin: login Google, contactos, usuarios y accesos
public/assets/  Logos e imágenes optimizados a WebP (brand, clients, partners, badges, team, photos, cases)
supabase/       migrations/ (tablas + RLS) y seed.sql (posts migrados de WordPress)
```

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Home |
| `/integracion-de-gen-ai-open-source`, `/finops`, `/ingenieria-de-plataformas`, `/ciberseguridad` | Servicios (mismas URLs que WordPress) |
| `/startups-y-scaleups`, `/servicios-financieros`, `/ecommerce-retail`, `/telecomunicaciones` | Industrias |
| `/como-trabajamos`, `/nosotros`, `/eventos`, `/contacto`, `/privacidad` | Institucionales |
| `/blog`, `/casos-de-exito`, `/blog/:slug` | Contenido (Supabase) |

Las URLs viejas de posts, `/category/casos-de-exito` y `/hablemos` redirigen con 301 (`vercel.json` y `public/_redirects` para Netlify/Cloudflare Pages).

## Supabase

1. Crear un proyecto en Supabase.
2. SQL Editor → ejecutar `supabase/migrations/20261021000000_init.sql` y luego `supabase/seed.sql`.
3. Copiar `Project URL` y `anon key` a `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.

Tablas:

- **posts** — blog y casos de éxito (`type`: `blog` | `caso`). Lectura pública solo de `published = true`; escritura para usuarios autenticados con email `@crubyt.com` (o desde el Table Editor de Supabase). Para publicar un caso nuevo alcanza con insertar una fila: no hace falta redeployar.
- **newsletter_subscribers** — el público solo puede insertar; la lista la lee el equipo autenticado.

Si se edita `src/content/posts.json`, regenerar el seed con `npm run seed:sql`.

## Formulario de contacto (Resend)

El formulario hace `POST /api/contact`, una Vercel Function (`api/contact.ts`) que valida los datos y envía el email con [Resend](https://resend.com). La API key vive solo en el servidor.

Variables en Vercel (Settings → Environment Variables), **sin** prefijo `VITE_`:

| Variable | Obligatoria | Descripción |
| --- | --- | --- |
| `RESEND_API_KEY` | Sí | API key de Resend |
| `CONTACT_TO` | No | Destinatarios separados por coma. Default `info@crubyt.com` |
| `CONTACT_FROM` | No | Remitente, ej. `Crubyt Web <web@crubyt.com>`. Requiere el dominio verificado en Resend → Domains. Mientras no esté verificado se usa `onboarding@resend.dev`, que solo entrega al email dueño de la cuenta de Resend |

El email llega con `reply_to` del visitante, así que se responde directo desde el correo. Para probar en local: `npx vercel dev` (el `npm run dev` de Vite no ejecuta funciones).

## Anti-spam

Los formularios públicos (contacto y newsletter) pasan por Vercel Functions (`api/contact.ts`, `api/subscribe.ts`), que aplican en `api/_antispam.ts`:

1. **Cloudflare Turnstile**: verificación invisible para personas (solo muestra un desafío si sospecha). Se carga recién cuando el usuario toca el formulario.
2. **Honeypot**: campo oculto que solo completan los bots.
3. **Tiempo mínimo**: envíos en menos de 3 s se descartan.
4. **Contenido**: más de 2 links, alfabetos cirílico/árabe/CJK o palabras típicas de spam (SEO, casino, crypto…) se descartan.
5. **Límite por IP**: máx. 3 envíos por hora por IP (se guarda un hash, no la IP).

A los bots detectados por 2–4 se les responde "ok" sin guardar nada. El newsletter ya no acepta inserts directos con la clave pública.

**Setup Turnstile**: Cloudflare → Turnstile → *Add widget* (gratis, no requiere tener el DNS en Cloudflare) → hostnames: el dominio de Vercel y `crubyt.com` → modo **Managed**. Variables en Vercel:

| Variable | Valor |
| --- | --- |
| `VITE_TURNSTILE_SITE_KEY` | Site key (pública) |
| `TURNSTILE_SECRET_KEY` | Secret key (sin `VITE_`) |

Sin estas variables el sitio funciona igual, con las defensas 2–5. Para probar en local se pueden usar las claves de test de Cloudflare (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`).

## Backend `/admin` (Google SSO + contactos)

Panel interno para el equipo: login con Google restringido a `@crubyt.com`, base de contactos del formulario y gestión de accesos. Se carga solo al entrar a `/admin` (no pesa en el sitio público) y no se indexa.

**Seguridad en capas**

1. Google OAuth configurado como app **Internal** del Workspace de Crubyt: solo cuentas de la organización pueden autenticarse.
2. Trigger en la base (`handle_new_user`): rechaza el alta de cualquier email que no termine en `@crubyt.com`.
3. RLS: quien entra queda como *pendiente*; solo ve contactos si un admin le activa **Ver contactos**. Los contactos solo se insertan desde `api/contact.ts` con la secret key.

**Roles**

| Rol | Puede |
| --- | --- |
| Admin | Ver/editar/eliminar contactos, autorizar usuarios, nombrar admins |
| Miembro con acceso | Ver contactos, cambiar estado y notas, exportar CSV |
| Miembro pendiente | Solo ve el aviso "acceso pendiente" |

Los admins iniciales se definen en la tabla `admin_bootstrap` (la migración incluye `sebastian.gravina@crubyt.com`).

**Setup (una vez)**

1. Supabase → SQL Editor: ejecutar `supabase/migrations/20261022000000_admin_contacts.sql`.
2. Google Cloud Console (con la cuenta de Crubyt): crear proyecto → *Google Auth Platform / OAuth consent screen* → User type **Internal** → *Clients* → *Create client* tipo **Web application** con:
   - Authorized JavaScript origins: `https://<dominio-del-sitio>`
   - Authorized redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`
3. Supabase → Authentication → Sign In / Providers → **Google**: habilitar y pegar Client ID y Client Secret.
4. Supabase → Authentication → URL Configuration: *Site URL* = dominio del sitio; *Redirect URLs* = `https://<dominio>/admin` (y la URL de Vercel si se usa).
5. Vercel → Environment Variables: `SUPABASE_SECRET_KEY` = secret key de Supabase (`sb_secret_…`), sin prefijo `VITE_`. Redeploy.

**HubSpot (futuro)**: la tabla `contacts` ya tiene `hubspot_contact_id` y `hubspot_synced_at`, con un índice para los pendientes de sincronizar. Una función programada (Vercel Cron o Supabase Edge Function) puede tomar los contactos con `hubspot_synced_at is null`, crearlos en HubSpot y marcar el ID.

## Deploy

Es un sitio estático (`dist/`). Recomendado: **Vercel**, **Netlify** o **Cloudflare Pages** — conectar el repo, build `npm run build`, output `dist`, y cargar las variables `VITE_*`.

## Pendientes de revisar con el equipo

- `src/content/site.ts → stats`: en el sitio actual los contadores estaban desalineados con sus etiquetas; validar los valores.
- Ingeniería de Plataformas: el WordPress muestra "10% mayor deployment frequency" en el hero y "10x" en beneficios; se unificó en **10x**.
- Gen AI: los pilares 2 y 3 del WordPress repetían textos de "Nosotros"; se dejó solo el pilar "Resultados medibles".
- Eventos: no tenían fecha/descripción ni fotos propias; se usaron fotos del equipo.
- Política de privacidad: texto provisorio.
