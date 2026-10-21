// Vercel Function: suscripción al newsletter con verificación anti-spam.
// Usa SUPABASE_SECRET_KEY y TURNSTILE_SECRET_KEY (ver api/contact.ts).

import { basicChecks, clientIp, ipHash, rateLimit, supabaseRest, verifyTurnstile } from './_antispam.js'

const json = (status: number, body: object) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export async function POST(request: Request): Promise<Response> {
  let raw: Record<string, unknown>
  try {
    raw = await request.json()
  } catch {
    return json(400, { ok: false, error: 'JSON inválido' })
  }
  if (!basicChecks(raw).ok) return json(200, { ok: true, status: 'ok' })

  const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : ''
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) return json(400, { ok: false, error: 'Email inválido' })

  const ip = clientIp(request)
  const hash = ipHash(ip)
  const human = await verifyTurnstile(raw.turnstile_token, ip)
  if (!human.ok) return json(human.status, { ok: false, error: human.error })
  const limit = await rateLimit('newsletter_subscribers', hash, 3, 60)
  if (!limit.ok) return json(limit.status, { ok: false, error: limit.error })

  const sb = supabaseRest()
  if (!sb) return json(500, { ok: false, error: 'Newsletter no configurado' })
  const source = typeof raw.source === 'string' ? raw.source.slice(0, 200) : null
  const res = await fetch(`${sb.url}/newsletter_subscribers`, {
    method: 'POST',
    headers: { ...sb.headers, Prefer: 'return=minimal' },
    body: JSON.stringify({ email, source, ip_hash: hash }),
  })
  if (res.ok) return json(200, { ok: true, status: 'ok' })
  if (res.status === 409) return json(200, { ok: true, status: 'exists' })
  console.error('[subscribe] Supabase error', res.status, await res.text())
  return json(502, { ok: false, error: 'No se pudo suscribir' })
}
