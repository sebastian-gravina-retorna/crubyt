# Crubyt Web

Sitio institucional de **Crubyt** — React 18 + Vite + TypeScript + Tailwind CSS, con Supabase para blog/casos de éxito y newsletter.
Reemplaza el sitio WordPress/PHP actual: el contenido, logos, colores y secciones fueron migrados desde crubyt.com.

## Desarrollo

```bash
npm install
cp .env.example .env   # opcional: completar Supabase y endpoint de contacto
npm run dev            # http://localhost:5173
npm run build          # genera dist/ (sitio estático)
```

Sin variables de entorno el sitio funciona igual: el blog usa `src/content/posts.json` y el formulario de contacto abre un email a info@crubyt.com.

## Estructura

```
src/
  content/      Textos editables: site.ts (home, equipo, clientes…), services.ts, industries.ts, posts.json
  components/   Header, Footer, Newsletter, bloques reutilizables (hero, formularios, cards)
  pages/        Home, ServicePage (plantilla de los 4 servicios), IndustryPage (4 industrias), Nosotros,
                Cómo trabajamos, Blog/Casos, Post, Eventos, Contacto, Privacidad, 404
  lib/          supabase.ts, posts.ts (Supabase con fallback local), forms.ts (newsletter + contacto)
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

## Formulario de contacto

Configurar `VITE_CONTACT_ENDPOINT` con cualquier servicio que reciba un POST JSON (Formspree, HubSpot, n8n, Make…). Sin endpoint, el formulario abre el cliente de correo.

## Deploy

Es un sitio estático (`dist/`). Recomendado: **Vercel**, **Netlify** o **Cloudflare Pages** — conectar el repo, build `npm run build`, output `dist`, y cargar las variables `VITE_*`.

## Pendientes de revisar con el equipo

- `src/content/site.ts → stats`: en el sitio actual los contadores estaban desalineados con sus etiquetas; validar los valores.
- Ingeniería de Plataformas: el WordPress muestra "10% mayor deployment frequency" en el hero y "10x" en beneficios; se unificó en **10x**.
- Gen AI: los pilares 2 y 3 del WordPress repetían textos de "Nosotros"; se dejó solo el pilar "Resultados medibles".
- Eventos: no tenían fecha/descripción ni fotos propias; se usaron fotos del equipo.
- Política de privacidad: texto provisorio.
