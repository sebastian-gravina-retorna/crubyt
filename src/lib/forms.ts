// Los formularios públicos pasan por Vercel Functions (api/), que aplican el anti-spam
// (Turnstile, honeypot, tiempo mínimo, contenido y límite por IP) antes de guardar.

export type ContactPayload = Record<string, string>
export type SendResult = { ok: true } | { ok: false; error: string }

async function post(path: string, body: Record<string, unknown>): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>
  return { ok: res.ok, data }
}

export async function sendContact(data: ContactPayload, extra: { turnstile_token: string | null; elapsed_ms: number }): Promise<SendResult> {
  const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || '/api/contact'
  const { ok, data: r } = await post(endpoint, { ...data, ...extra, page: window.location.href })
  return ok ? { ok: true } : { ok: false, error: (r.error as string) || 'No pudimos enviar tu mensaje.' }
}

export async function subscribeNewsletter(email: string, extra: { turnstile_token: string | null; elapsed_ms: number; website?: string }): Promise<'ok' | 'exists' | { error: string }> {
  const { ok, data } = await post('/api/subscribe', { email, source: window.location.pathname, ...extra })
  if (ok) return data.status === 'exists' ? 'exists' : 'ok'
  return { error: (data.error as string) || 'No pudimos suscribirte. Intenta de nuevo más tarde.' }
}
