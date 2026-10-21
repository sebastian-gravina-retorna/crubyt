import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { subscribeNewsletter } from '../lib/forms'
import { cx } from './ui'

export default function Newsletter({ dark, className }: { dark?: boolean; className?: string }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'exists' | 'error'>('idle')

  async function submit(e: FormEvent) {
    e.preventDefault()
    setState('loading')
    setState(await subscribeNewsletter(email))
  }

  if (state === 'ok' || state === 'exists')
    return (
      <p className={cx('flex items-center gap-2 text-sm font-medium', dark ? 'text-white' : 'text-ink', className)}>
        <Check className="h-4 w-4 text-brand" />
        {state === 'ok' ? '¡Listo! Te suscribiste al newsletter.' : 'Ya estabas suscripto. ¡Gracias!'}
      </p>
    )

  return (
    <form onSubmit={submit} className={className}>
      <div className={cx('flex items-center rounded-full border p-1', dark ? 'border-white/15 bg-white/5' : 'border-ink/10 bg-white')}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@empresa.com"
          aria-label="Correo electrónico"
          className={cx('min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none', dark ? 'text-white placeholder:text-white/40' : 'text-ink placeholder:text-ink/40')}
        />
        <button disabled={state === 'loading'} className="rounded-full bg-brand p-2.5 text-white transition hover:bg-brand-600 disabled:opacity-60" aria-label="Suscribirme">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {state === 'error' && <p className="mt-2 text-xs text-brand-400">No pudimos suscribirte. Intenta de nuevo más tarde.</p>}
    </form>
  )
}
