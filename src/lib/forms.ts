import { supabase } from './supabase'

export async function subscribeNewsletter(email: string): Promise<'ok' | 'exists' | 'error'> {
  if (!supabase) {
    console.warn('[newsletter] Supabase no configurado')
    return 'error'
  }
  const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim().toLowerCase(), source: window.location.pathname })
  if (!error) return 'ok'
  if (error.code === '23505') return 'exists'
  return 'error'
}

export type ContactPayload = Record<string, string>

/** Envía el formulario a /api/contact (Vercel Function + Resend). */
export async function sendContact(data: ContactPayload): Promise<boolean> {
  const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || '/api/contact'
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...data, page: window.location.href }),
  })
  return res.ok
}
