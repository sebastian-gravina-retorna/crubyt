import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ')
}

export function Seo({ title, description }: { title: string; description?: string }) {
  const full = title.includes('Crubyt') ? title : `${title} | Crubyt`
  return (
    <Helmet>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  )
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function Section({ children, className, dark, id }: { children: ReactNode; className?: string; dark?: boolean; id?: string }) {
  return (
    <section id={id} className={cx('relative py-20 sm:py-28', dark ? 'bg-ink text-white' : '', className)}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={cx('mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]', light ? 'text-brand-400' : 'text-brand-600')}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </p>
  )
}

export function Heading({ children, className, as: Tag = 'h2' }: { children: ReactNode; className?: string; as?: 'h1' | 'h2' | 'h3' }) {
  return <Tag className={cx('font-display font-bold tracking-tight text-balance', Tag === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl', className)}>{children}</Tag>
}

type BtnProps = { to: string; children: ReactNode; variant?: 'primary' | 'ghost' | 'light' | 'outline'; className?: string }
export function Button({ to, children, variant = 'primary', className }: BtnProps) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand-600 shadow-lg shadow-brand/25',
    light: 'bg-white text-ink hover:bg-mist',
    ghost: 'border border-white/25 text-white hover:bg-white/10',
    outline: 'border border-ink/15 text-ink hover:border-brand hover:text-brand',
  }[variant]
  const cls = cx('group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition', styles, className)
  const inner = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </>
  )
  return to.startsWith('http') || to.startsWith('mailto:') ? (
    <a href={to} className={cls}>{inner}</a>
  ) : (
    <Link to={to} className={cls}>{inner}</Link>
  )
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({ value, decimals = 0, prefix = '', suffix = '' }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: setV })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className={cx('relative overflow-hidden', className)}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap py-4">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-semibold">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
        ))}
      </div>
    </div>
  )
}

/** Fondo decorativo: grilla + resplandor con los colores de marca */
export function GlowBg({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
      <div className="absolute -bottom-40 -right-20 h-[380px] w-[480px] rounded-full bg-violet/20 blur-[120px]" />
    </div>
  )
}

export function Hexagon({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={cx('relative [clip-path:polygon(25%_3%,75%_3%,100%_50%,75%_97%,25%_97%,0_50%)]', className)}>{children}</div>
  )
}
