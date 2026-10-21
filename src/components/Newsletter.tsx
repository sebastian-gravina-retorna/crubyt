import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { subscribeNewsletter } from '../lib/forms'
import Turnstile, { TURNSTILE_SITE_KEY } from './Turnstile'
import { cx } from './ui'

export default function Newsletter({ dark, className }: { dark?: boolean; className?: string }) {
  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'exists' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  // El widget de Turnstile se carga recién cuando la persona interactúa con el campo
  const [active, setActive] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)
  const startedAt = useRef(Date.now())
  const waiting = !!TURNSTILE_SITE_KEY && active && !token

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!active) setActive(true)
    if (TURNSTILE_SITE_KEY && !token) return
    setState('loading')
    const r = await subscribeNewsletter(email, { turnstile_token: token, elapsed_ms: Date.now() - startedAt.current, website: hp }).catch(() => ({ error: 'No pudimos suscribirte.' }))
    if (typeof r === 'string') return setState(r)
    setError(r.error)
    setState('error')
    setResetKey((k) => k + 1)
  }

  if (state === 'ok' || state === 'exists')
    return (
      <p className={cx('flex items-center gap-2 text-sm font-medium', dark ? 'text-white' : 'text-ink', className)}>
        <Check className="h-4 w-4 text-brand" />
        {state === 'ok' ? '¡Listo! Te suscribiste al newsletter.' : 'Ya estabas suscripto. ¡Gracias!'}
      </p>
    )

  return (
    <form onSubmit={submit} className={cx('relative', className)}>
      <div className={cx('flex items-center rounded-full border p-1', dark ? 'border-white/15 bg-white/5' : 'border-ink/10 bg-white')}>
        <input
          type="email"
          required
          value={email}
          onFocus={() => setActive(true)}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@empresa.com"
          aria-label="Correo electrónico"
          className={cx('min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none', dark ? 'text-white placeholder:text-white/40' : 'text-ink placeholder:text-ink/40')}
        />
        <input name="website" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-px w-px opacity-0" aria-hidden />
        <button disabled={state === 'loading' || waiting} className="rounded-full bg-brand p-2.5 text-white transition hover:bg-brand-600 disabled:opacity-60" aria-label="Suscribirme">
          {state === 'loading' || waiting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      {active && (
        <div className="mt-2">
          <Turnstile onToken={setToken} resetKey={resetKey} theme={dark ? 'dark' : 'light'} />
        </div>
      )}
      {state === 'error' && <p className={cx('mt-2 text-xs', dark ? 'text-brand-400' : 'text-brand')}>{error}</p>}
    </form>
  )
}
