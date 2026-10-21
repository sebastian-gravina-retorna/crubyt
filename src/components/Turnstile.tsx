import { useEffect, useRef } from 'react'

// Cloudflare Turnstile: verificación anti-bots, casi siempre invisible para personas reales.
// Se activa solo si VITE_TURNSTILE_SITE_KEY está configurada.
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  reset: (id: string) => void
  remove: (id: string) => void
}
declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null
function loadScript(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')))
      s.onerror = () => {
        scriptPromise = null
        reject(new Error('turnstile'))
      }
      document.head.appendChild(s)
    })
  }
  return scriptPromise
}

/**
 * Renderiza el widget y devuelve el token por onToken (null si expira).
 * `resetKey`: cambiarlo fuerza un token nuevo (los tokens son de un solo uso).
 */
export default function Turnstile({ onToken, onError, resetKey = 0, theme = 'light' }: { onToken: (t: string | null) => void; onError?: () => void; resetKey?: number; theme?: 'light' | 'dark' }) {
  const el = useRef<HTMLDivElement>(null)
  const id = useRef<string | null>(null)
  const cb = useRef(onToken)
  cb.current = onToken
  const errCb = useRef(onError)
  errCb.current = onError

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return
    let cancelled = false
    loadScript()
      .then((ts) => {
        if (cancelled || !el.current) return
        id.current = ts.render(el.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme,
          appearance: 'interaction-only', // solo se muestra si Cloudflare necesita que la persona interactúe
          callback: (t: string) => cb.current(t),
          'expired-callback': () => cb.current(null),
          'error-callback': () => {
            cb.current(null)
            errCb.current?.()
          },
        })
      })
      .catch(() => {
        cb.current(null)
        errCb.current?.()
      })
    return () => {
      cancelled = true
      if (id.current) window.turnstile?.remove(id.current)
      id.current = null
    }
  }, [theme])

  useEffect(() => {
    if (resetKey && id.current) {
      cb.current(null)
      window.turnstile?.reset(id.current)
    }
  }, [resetKey])

  if (!TURNSTILE_SITE_KEY) return null
  return <div ref={el} className="min-h-0 [&>div]:mx-auto" />
}
