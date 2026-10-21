// Defensas anti-spam compartidas por los endpoints públicos (archivo con "_": Vercel no lo expone como ruta).
//
//  1. Honeypot: campo oculto `website` que solo completan los bots.
//  2. Tiempo mínimo: un formulario completado en menos de 3 s no lo escribió una persona.
//  3. Cloudflare Turnstile: token verificado contra Cloudflare (si TURNSTILE_SECRET_KEY está configurada).
//  4. Contenido: bloquea mensajes con muchos links, alfabetos ajenos al público (cirílico, CJK…) o
//     palabras típicas de spam.
//  5. Límite por IP: máximo de envíos por IP en una ventana (requiere Supabase).
//
// A los bots detectados por 1, 2 o 4 se les responde "ok" sin guardar nada, para no darles pistas.

import { createHash } from 'node:crypto'

export type Verdict = { ok: true } | { ok: false; status: number; error: string; silent?: boolean }

export function clientIp(request: Request): string {
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  )
}

/** Hash de la IP (no guardamos la IP en claro) */
export function ipHash(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'crubyt'
  return createHash('sha256').update(salt + ip).digest('hex').slice(0, 32)
}

export async function verifyTurnstile(token: unknown, ip: string): Promise<Verdict> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('[antispam] TURNSTILE_SECRET_KEY no configurada: se omite la verificación')
    return { ok: true }
  }
  if (typeof token !== 'string' || !token) return { ok: false, status: 400, error: 'Verificación anti-spam incompleta. Recarga la página e intenta de nuevo.' }
  const body = new URLSearchParams({ secret, response: token })
  if (ip !== 'unknown') body.set('remoteip', ip)
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] }
    if (data.success) return { ok: true }
    console.warn('[antispam] Turnstile rechazó el token', data['error-codes'])
  } catch (e) {
    console.error('[antispam] Turnstile no respondió', e)
  }
  return { ok: false, status: 400, error: 'No pudimos verificar que no eres un robot. Recarga la página e intenta de nuevo.' }
}

export function basicChecks(raw: Record<string, unknown>): Verdict {
  if (raw.website) return { ok: false, status: 200, error: 'honeypot', silent: true }
  const elapsed = Number(raw.elapsed_ms)
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 3000) return { ok: false, status: 200, error: 'too-fast', silent: true }
  return { ok: true }
}

const FOREIGN_SCRIPT = /[Ѐ-ӿ؀-ۿ฀-๿぀-ヿ㐀-鿿가-힯]/
const SPAM_WORDS = /\b(viagra|cialis|casino|crypto ?invest|bitcoin|forex|loan offer|seo services?|backlinks?|guest post|porn|escort|telegram ?@|whatsapp ?\+?\d{6,})\b/i

export function contentChecks(fields: Record<string, string>): Verdict {
  const all = Object.values(fields).join(' ')
  const msg = fields.mensaje ?? ''
  const links = (msg.match(/https?:\/\/|www\./gi) ?? []).length
  const nameHasUrl = /https?:|www\.|\.(com|ru|xyz|top)\b/i.test(`${fields.nombres ?? ''} ${fields.apellidos ?? ''}`)
  if (links > 2 || nameHasUrl || FOREIGN_SCRIPT.test(all) || SPAM_WORDS.test(all)) {
    return { ok: false, status: 200, error: 'content', silent: true }
  }
  return { ok: true }
}

function sbHeaders(key: string): Record<string, string> {
  const h: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' }
  if (!key.startsWith('sb_')) h.Authorization = `Bearer ${key}`
  return h
}

export function supabaseRest(): { url: string; headers: Record<string, string> } | null {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) return null
  return { url: url.replace(/\/$/, '') + '/rest/v1', headers: sbHeaders(key) }
}

/** Cuenta filas recientes de la misma IP en `table` para limitar envíos. */
export async function rateLimit(table: string, hash: string, max: number, minutes: number): Promise<Verdict> {
  const sb = supabaseRest()
  if (!sb) return { ok: true }
  const since = new Date(Date.now() - minutes * 60_000).toISOString()
  try {
    const res = await fetch(`${sb.url}/${table}?select=id&ip_hash=eq.${hash}&created_at=gte.${encodeURIComponent(since)}`, {
      headers: { ...sb.headers, Prefer: 'count=exact', Range: '0-0' },
    })
    const total = Number(res.headers.get('content-range')?.split('/')[1] ?? 0)
    if (total >= max) return { ok: false, status: 429, error: 'Recibimos varios envíos desde tu conexión. Intenta de nuevo en unos minutos o escríbenos a info@crubyt.com.' }
  } catch {
    /* si falla el conteo no bloqueamos */
  }
  return { ok: true }
}
