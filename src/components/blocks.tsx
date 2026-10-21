import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, CheckCircle2, XCircle } from 'lucide-react'
import { clients } from '../content/site'
import { sendContact } from '../lib/forms'
import type { Post } from '../lib/posts'
import { Container, Eyebrow, GlowBg, Heading, Reveal, cx } from './ui'

const input =
  'w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-brand focus:ring-4 focus:ring-brand/10'

export function ContactForm({ variant = 'default' }: { variant?: 'default' | 'industry' }) {
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>
    if (data.website) return // honeypot
    delete data.website
    setState('loading')
    try {
      setState((await sendContact(data)) ? 'ok' : 'error')
    } catch {
      setState('error')
    }
  }
  if (state === 'ok')
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center">
        <div className="rounded-full bg-brand-50 p-4 text-brand"><Check className="h-8 w-8" /></div>
        <p className="mt-5 font-display text-2xl font-bold text-ink">¡Gracias por escribirnos!</p>
        <p className="mt-2 text-sm text-ink/60">Nuestro equipo se pondrá en contacto contigo a la brevedad.</p>
      </div>
    )
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-white p-6 shadow-2xl shadow-ink/20 sm:grid-cols-2 sm:p-8">
      <input name="nombres" required placeholder="Nombres" className={input} />
      <input name="apellidos" required placeholder="Apellidos" className={input} />
      <input name="telefono" type="tel" placeholder="Número telefónico" className={input} />
      <input name="email" type="email" required placeholder="Correo electrónico" className={input} />
      {variant === 'industry' ? (
        <>
          <input name="empresa" placeholder="Nombre de la empresa" className={input} />
          <input name="ciudad" placeholder="¿En qué ciudad nos escribes?" className={input} />
        </>
      ) : (
        <>
          <input name="rol" placeholder="Rol" className={input} />
          <input name="url_empresa" placeholder="URL Empresa" className={input} />
        </>
      )}
      <textarea name="mensaje" rows={4} placeholder="Déjanos tu mensaje" className={cx(input, 'sm:col-span-2')} />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex items-start gap-3 text-xs text-ink/60 sm:col-span-2">
        <input type="checkbox" required name="privacidad" value="acepto" className="mt-0.5 h-4 w-4 accent-brand" />
        <span>Acepto la <Link to="/privacidad" className="underline hover:text-brand">política de privacidad y usos de datos</Link></span>
      </label>
      <button disabled={state === 'loading'} className="rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-600 disabled:opacity-60 sm:col-span-2">
        {state === 'loading' ? 'Enviando…' : 'Contacta con nuestro equipo'}
      </button>
      {state === 'error' && <p className="text-sm text-brand sm:col-span-2">No pudimos enviar tu mensaje. Escríbenos a info@crubyt.com.</p>}
    </form>
  )
}

export function ContactSection({ title = 'Lleva tus operaciones en la nube al siguiente nivel.', lead = 'Cuéntanos qué estás necesitando y nuestro equipo te ayudará a encontrar el mejor camino.', variant }: { title?: string; lead?: string; variant?: 'default' | 'industry' }) {
  return (
    <section id="contacto" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <GlowBg />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow light>Hablemos</Eyebrow>
          <Heading className="max-w-lg">{title}</Heading>
          <p className="mt-5 max-w-md text-white/70">{lead}</p>
          <img src="/assets/brand/robot-contact.webp" alt="" className="mt-10 hidden w-64 lg:block" loading="lazy" width={424} height={399} />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm variant={variant} />
        </Reveal>
      </Container>
    </section>
  )
}

export function ClientsGrid() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/5 bg-ink/5 sm:grid-cols-3 lg:grid-cols-6">
      {clients.map((c) => (
        <div key={c.name} className="flex items-center justify-center bg-white p-6 transition hover:bg-mist">
          <img src={c.logo} alt={c.name} title={c.name} className="h-16 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" loading="lazy" />
        </div>
      ))}
    </div>
  )
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/10">
      <div className="aspect-[16/10] overflow-hidden bg-ink">
        {post.cover_url && <img src={post.cover_url} alt="" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" loading="lazy" />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-600">{post.category}</span>
          {post.client && <span className="text-ink/50">{post.client}</span>}
        </div>
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink group-hover:text-brand">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm text-ink/60">{post.excerpt}</p>
        <span className="mt-auto flex items-center gap-1 pt-6 text-sm font-semibold text-ink">
          Leer caso <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

export function BeforeAfter({ title, before, after }: { title: string; before: string[]; after: string[] }) {
  return (
    <div>
      <Heading className="mx-auto max-w-3xl text-center">{title}</Heading>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-ink/5 bg-mist p-8">
          <p className="font-display text-lg font-bold text-ink/50">Antes de Crubyt</p>
          <ul className="mt-6 space-y-4">
            {before.map((b) => (
              <li key={b} className="flex gap-3 text-ink/70"><XCircle className="mt-0.5 h-5 w-5 shrink-0 text-ink/30" />{b}</li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand/30 blur-3xl" />
          <p className="relative font-display text-lg font-bold text-brand-400">Después de Crubyt</p>
          <ul className="relative mt-6 space-y-4">
            {after.map((b) => (
              <li key={b} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function PageHero({ eyebrow, title, lead, children, image, contain }: { eyebrow: string; title: string; lead?: string; children?: ReactNode; image?: string; contain?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-28 lg:pt-44">
      <GlowBg />
      <Container className={cx('relative grid items-center gap-12', image && 'lg:grid-cols-2')}>
        <div>
          <Eyebrow light>{eyebrow}</Eyebrow>
          <Heading as="h1" className="max-w-3xl">{title}</Heading>
          {lead && <p className="mt-6 max-w-2xl text-lg text-white/70">{lead}</p>}
          {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <Reveal delay={0.15} className="relative">
            <div className={cx('absolute -inset-4 bg-brand-gradient opacity-30 blur-2xl', contain ? 'rounded-full' : 'rounded-[2.5rem]')} />
            <img src={image} alt="" className={cx('relative w-full', contain ? 'mx-auto max-h-[420px] object-contain' : 'aspect-[4/3] rounded-[2rem] border border-white/10 object-cover')} />
          </Reveal>
        )}
      </Container>
    </section>
  )
}
