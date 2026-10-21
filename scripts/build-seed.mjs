// Genera supabase/seed.sql a partir de src/content/posts.json
import { readFileSync, writeFileSync } from 'node:fs'
const posts = JSON.parse(readFileSync(new URL('../src/content/posts.json', import.meta.url)))
const q = (v) => (v == null ? 'null' : `'${String(v).replace(/'/g, "''")}'`)
const rows = posts.map((p) =>
  `(${[p.slug, p.title, p.excerpt, p.category, p.client, p.type, p.cover_url, p.content_html, p.published_at].map(q).join(', ')})`,
)
const sql = `-- Generado por scripts/build-seed.mjs: posts migrados desde WordPress\ninsert into public.posts (slug, title, excerpt, category, client, type, cover_url, content_html, published_at) values\n${rows.join(',\n')}\non conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, category = excluded.category, client = excluded.client, type = excluded.type, cover_url = excluded.cover_url, content_html = excluded.content_html, published_at = excluded.published_at;\n`
writeFileSync(new URL('../supabase/seed.sql', import.meta.url), sql)
console.log(`seed.sql: ${posts.length} posts`)
