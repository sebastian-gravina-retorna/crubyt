import { supabase } from './supabase'
import { contact } from '../content/site'

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

/** Envía el formulario al endpoint configurado; si no hay, abre el cliente de correo. */
export async function sendContact(data: ContactPayload): Promise<boolean> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, page: window.location.href }),
    })
    return res.ok
  }
  const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n')
  window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Contacto desde crubyt.com')}&body=${encodeURIComponent(body)}`
  return true
}
