// Vercel Function: recibe el formulario de contacto y lo envía por email con Resend.
// Variables de entorno (Vercel → Settings → Environment Variables), SIN prefijo VITE_:
//   RESEND_API_KEY  (obligatoria)  clave de Resend
//   CONTACT_TO      (opcional)     destinatario(s), separados por coma. Default: info@crubyt.com
//   CONTACT_FROM    (opcional)     remitente de un dominio verificado en Resend.
//                                  Default: "Crubyt Web <onboarding@resend.dev>" (solo para pruebas)
//   SUPABASE_SECRET_KEY (opcional) secret key de Supabase (sb_secret_… o service_role) para guardar
//                                  el contacto en la tabla `contacts`. URL: SUPABASE_URL o VITE_SUPABASE_URL.

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
const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

async function saveContact(data: Record<string, string>, emailSent: boolean): Promise<string | null> {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) return null
  const headers: Record<string, string> = {
    apikey: key,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  }
  // Las claves legacy (JWT service_role) también requieren Authorization; las sb_secret_ no.
  if (!key.startsWith('sb_')) headers.Authorization = `Bearer ${key}`
  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/contacts?select=id`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...data, email_sent: emailSent }),
  })
  if (!res.ok) {
    console.error('[contact] Supabase error', res.status, await res.text())
    return null
  }
  const rows = (await res.json()) as { id: string }[]
  return rows[0]?.id ?? null
}

async function markEmailSent(id: string) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY!
  const headers: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' }
  if (!key.startsWith('sb_')) headers.Authorization = `Bearer ${key}`
  await fetch(`${url!.replace(/\/$/, '')}/rest/v1/contacts?id=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ email_sent: true }),
  }).catch(() => {})
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY

  let raw: Record<string, unknown>
  try {
    raw = await request.json()
  } catch {
    return json(400, { ok: false, error: 'JSON inválido' })
  }

  // Honeypot anti-spam
  if (raw.website) return json(200, { ok: true })

  const data: Record<string, string> = {}
  for (const key of Object.keys(LABELS)) {
    const v = raw[key]
    if (typeof v === 'string' && v.trim()) data[key] = v.trim().slice(0, MAX)
  }

  const email = data.email ?? ''
  if (!data.nombres || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
    return json(400, { ok: false, error: 'Nombre y email válidos son obligatorios' })
  }

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

  const to = (process.env.CONTACT_TO || 'info@crubyt.com').split(',').map((s) => s.trim()).filter(Boolean)
  const from = process.env.CONTACT_FROM || 'Crubyt Web <onboarding@resend.dev>'

  // 1) Guardar primero en Supabase: el lead no se pierde aunque falle el email.
  const contactId = await saveContact(data, false)

  // 2) Notificar por email con Resend
  let emailOk = false
  if (apiKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
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
