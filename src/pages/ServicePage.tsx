import { CheckCircle2 } from 'lucide-react'
import type { Service } from '../content/services'
import { Button, Eyebrow, Heading, Reveal, Section, Seo } from '../components/ui'
import { BeforeAfter, ContactSection, PageHero } from '../components/blocks'

function CardGrid({ items, numbered }: { items: { title: string; text?: string; meta?: string }[]; numbered?: boolean }) {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c, i) => (
        <Reveal key={c.title + i} delay={(i % 3) * 0.06}>
          <div className="h-full rounded-3xl border border-ink/5 bg-white p-7 shadow-sm transition hover:shadow-lg hover:shadow-ink/5">
            {numbered && <p className="font-display text-sm font-bold text-brand">{String(i + 1).padStart(2, '0')}</p>}
            <h3 className="mt-2 font-display text-lg font-bold text-ink">{c.title}</h3>
            {c.meta && <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/40">{c.meta}</p>}
            {c.text && <p className="mt-3 text-sm leading-relaxed text-ink/60">{c.text}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function ServicePage({ s }: { s: Service }) {
  return (
    <>
      <Seo title={s.name} description={s.title} />
      <PageHero eyebrow={s.eyebrow} title={s.title} lead={s.subtitle} image={s.image}>
        <Button to="#contacto">{s.cta}</Button>
      </PageHero>

      <section className="relative z-10 -mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/5 shadow-2xl shadow-ink/10 lg:grid-cols-4">
            {s.stats.map((st) => (
              <div key={st.label} className="bg-white p-6 sm:p-8">
                <p className="bg-brand-gradient bg-clip-text font-display text-3xl font-bold text-transparent sm:text-4xl">{st.value}</p>
                <p className="mt-2 text-sm text-ink/60">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {s.intro && (
        <Section>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>Nuestro enfoque</Eyebrow>
            <Heading>{s.intro.title}</Heading>
            {s.intro.text && <p className="mt-6 text-lg text-ink/65">{s.intro.text}</p>}
          </Reveal>
        </Section>
      )}

      {(s.fit || s.steps) && (
        <Section className={s.intro ? 'bg-mist' : ''}>
          <div className="grid gap-12 lg:grid-cols-12">
            {s.fit && (
              <Reveal className="lg:col-span-5">
                <Eyebrow>¿Es para ti?</Eyebrow>
                <Heading className="text-2xl sm:text-3xl">{s.fit.title}</Heading>
                <ul className="mt-8 space-y-4">
                  {s.fit.items.map((f) => (
                    <li key={f} className="flex gap-3 text-ink/75">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {s.steps && (
              <div className={s.fit ? 'lg:col-span-7' : 'lg:col-span-12'}>
                {!s.fit && <Heading className="mb-10">{s.steps.title}</Heading>}
                <div className="grid gap-4 sm:grid-cols-2">
                  {s.steps.items.map((st, i) => (
                    <Reveal key={st.title} delay={i * 0.06}>
                      <div className="h-full rounded-3xl bg-ink p-7 text-white">
                        <p className="font-display text-sm font-bold text-brand-400">{String(i + 1).padStart(2, '0')}</p>
                        <h3 className="mt-3 font-display text-xl font-bold">{st.title}</h3>
                        <p className="mt-2 text-sm text-white/65">{st.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {s.offerings && (
        <Section className="bg-mist">
          <Reveal className="max-w-3xl">
            <Eyebrow>Servicios</Eyebrow>
            <Heading>{s.offerings.title}</Heading>
            <p className="mt-5 text-ink/65">{s.offerings.text}</p>
          </Reveal>
          <div className="mt-12 space-y-4">
            {s.offerings.items.map((o, i) => (
              <Reveal key={o.code} delay={i * 0.04}>
                <div className="grid gap-6 rounded-3xl border border-ink/5 bg-white p-7 lg:grid-cols-12 lg:items-center">
                  <div className="flex items-center gap-4 lg:col-span-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient font-display text-sm font-bold text-white">{o.code}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">{o.title}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">{o.duration}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">El problema</p>
                    <p className="mt-1 text-sm text-ink/70">{o.problem}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">La solución</p>
                    <p className="mt-1 text-sm text-ink/70">{o.solution}</p>
                  </div>
                  <div className="rounded-2xl bg-mist p-4 lg:col-span-2">
                    <p className="text-xs font-semibold text-ink/50">Lo que ganas</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{o.gain}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {s.problems && (
        <Section>
          <Reveal className="max-w-3xl">
            <Eyebrow>Desafíos</Eyebrow>
            <Heading>{s.problems.title}</Heading>
          </Reveal>
          <CardGrid items={s.problems.items} />
        </Section>
      )}

      {s.tech && (
        <Section dark className="overflow-hidden">
          <Reveal className="max-w-3xl">
            <Eyebrow light>Stack</Eyebrow>
            <Heading>{s.tech.title}</Heading>
            {s.tech.text && <p className="mt-4 text-white/65">{s.tech.text}</p>}
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.tech.items.map((t) => (
              <div key={t.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="font-display font-bold">{t.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.items.map((x) => (
                    <span key={x} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{x}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {s.phases && (
        <Section>
          <Reveal className="max-w-3xl">
            <Eyebrow>Metodología</Eyebrow>
            <Heading>{s.phases.title}</Heading>
          </Reveal>
          <div className="relative mt-14 grid gap-6 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-brand via-magenta to-violet lg:block" />
            {s.phases.items.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="relative">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display font-bold text-white ring-8 ring-white">{i + 1}</span>
                  <h3 className="mt-6 font-display text-lg font-bold text-ink">{p.title}</h3>
                  {p.meta && <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-600">{p.meta}</p>}
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {s.benefits && (
        <Section className="bg-mist">
          <Reveal className="max-w-3xl">
            <Eyebrow>Valor</Eyebrow>
            <Heading>{s.benefits.title}</Heading>
          </Reveal>
          <CardGrid items={s.benefits.items} numbered />
        </Section>
      )}

      {s.beforeAfter && (
        <Section>
          <BeforeAfter {...s.beforeAfter} />
        </Section>
      )}

      <ContactSection title={s.closing.title} lead={s.closing.text} />
    </>
  )
}
