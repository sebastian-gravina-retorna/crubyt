// Vercel Function: recibe el formulario de contacto, filtra spam, lo guarda en Supabase y avisa por email con Resend.
// Variables de entorno (Vercel → Settings → Environment Variables), SIN prefijo VITE_:
//   RESEND_API_KEY        clave de Resend (aviso por email)
//   CONTACT_TO            destinatario(s), separados por coma. Default: info@crubyt.com
//   CONTACT_FROM          remitente de un dominio verificado en Resend. Default: onboarding@resend.dev (solo pruebas)
//   SUPABASE_SECRET_KEY   secret key de Supabase para guardar en `contacts` (URL: SUPABASE_URL o VITE_SUPABASE_URL)
//   TURNSTILE_SECRET_KEY  secret key de Cloudflare Turnstile (anti-spam)

import { basicChecks, clientIp, contentChecks, ipHash, rateLimit, supabaseRest, verifyTurnstile } from './_antispam.js'

const LABELS: Record<string, string> = {
  nombres: 'Nombres',
  apellidos: 'Apellidos',
  email: 'Correo electrónico',
  telefono: 'Teléfono',
  rol: 'Rol',
  url_empresa: 'URL empresa',
  empresa: 'Empresa',
  ciudad: 'Ciudad',
  mensaje: 'Mensaje',
  page: 'Página',
}

const MAX = 5000
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
const json = (status: number, body: object) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

async function saveContact(data: Record<string, string>, hash: string): Promise<string | null> {
  const sb = supabaseRest()
  if (!sb) return null
  const res = await fetch(`${sb.url}/contacts?select=id`, {
    method: 'POST',
    headers: { ...sb.headers, Prefer: 'return=representation' },
    body: JSON.stringify({ ...data, ip_hash: hash, email_sent: false }),
  })
  if (!res.ok) {
    console.error('[contact] Supabase error', res.status, await res.text())
    return null
  }
  const rows = (await res.json()) as { id: string }[]
  return rows[0]?.id ?? null
}

async function markEmailSent(id: string) {
  const sb = supabaseRest()
  if (!sb) return
  await fetch(`${sb.url}/contacts?id=eq.${id}`, { method: 'PATCH', headers: sb.headers, body: JSON.stringify({ email_sent: true }) }).catch(() => {})
}

export async function POST(request: Request): Promise<Response> {
  let raw: Record<string, unknown>
  try {
    raw = await request.json()
  } catch {
    return json(400, { ok: false, error: 'JSON inválido' })
  }

  // Anti-spam: honeypot + tiempo mínimo (respuesta silenciosa a bots)
  const basic = basicChecks(raw)
  if (!basic.ok) return json(200, { ok: true })

  const data: Record<string, string> = {}
  for (const key of Object.keys(LABELS)) {
    const v = raw[key]
    if (typeof v === 'string' && v.trim()) data[key] = v.trim().slice(0, MAX)
  }
  const email = data.email ?? ''
  if (!data.nombres || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
    return json(400, { ok: false, error: 'Nombre y email válidos son obligatorios' })
  }

  // Anti-spam: Turnstile, contenido y límite por IP
  const ip = clientIp(request)
  const hash = ipHash(ip)
  const human = await verifyTurnstile(raw.turnstile_token, ip)
  if (!human.ok) return json(human.status, { ok: false, error: human.error })
  const content = contentChecks(data)
  if (!content.ok) {
    console.warn('[contact] descartado por contenido', email)
    return json(200, { ok: true })
  }
  const limit = await rateLimit('contacts', hash, 3, 60)
  if (!limit.ok) return json(limit.status, { ok: false, error: limit.error })

  const fullName = [data.nombres, data.apellidos].filter(Boolean).join(' ')
  const rows = Object.entries(data)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#69727d;font-size:13px;vertical-align:top;white-space:nowrap">${LABELS[k]}</td>` +
        `<td style="padding:8px 12px;color:#00021c;font-size:14px;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join('')
  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto">
    <div style="background:#00021c;padding:20px 24px;border-radius:12px 12px 0 0">
      <span style="color:#fb3640;font-size:20px;font-weight:700">crubyt</span>
      <span style="color:#ffffff99;font-size:13px;margin-left:8px">Nuevo contacto desde la web</span>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#f0f5f9;border-radius:0 0 12px 12px">${rows}</table>
  </div>`
  const text = Object.entries(data).map(([k, v]) => `${LABELS[k]}: ${v}`).join('\n')

  // 1) Guardar primero en Supabase: el lead no se pierde aunque falle el email.
  const contactId = await saveContact(data, hash)

  // 2) Avisar por email con Resend
  let emailOk = false
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Crubyt Web <onboarding@resend.dev>',
        to: (process.env.CONTACT_TO || 'info@crubyt.com').split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: email,
        subject: `Nuevo contacto web: ${fullName}${data.empresa ? ` (${data.empresa})` : ''}`,
        html,
        text,
      }),
    })
    emailOk = res.ok
    if (!res.ok) console.error('[contact] Resend error', res.status, await res.text())
  }
  if (emailOk && contactId) await markEmailSent(contactId)

  if (!emailOk && !contactId) return json(502, { ok: false, error: 'No se pudo registrar el contacto' })
  return json(200, { ok: true })
}
