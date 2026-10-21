import { CheckCircle2 } from 'lucide-react'
import type { Industry } from '../content/industries'
import { Button, Eyebrow, Heading, Reveal, Section, Seo } from '../components/ui'
import { ContactSection, PageHero } from '../components/blocks'

export default function IndustryPage({ ind }: { ind: Industry }) {
  return (
    <>
      <Seo title={ind.name} description={ind.lead} />
      <PageHero eyebrow={ind.eyebrow} title={ind.title} lead={ind.lead} image={ind.image} contain={ind.image.includes('robot')}>
        <Button to="#contacto">{ind.cta}</Button>
      </PageHero>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Heading>{ind.intro.title}</Heading>
            {ind.intro.text.map((t) => (
              <p key={t} className="mt-5 text-lg text-ink/65">{t}</p>
            ))}
          </Reveal>
          {ind.image2 && (
            <Reveal delay={0.1}>
              <img src={ind.image2} alt="" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl shadow-ink/10" loading="lazy" />
            </Reveal>
          )}
        </div>
      </Section>

      <Section className="bg-mist">
        <Reveal className="max-w-3xl">
          <Eyebrow>Desafíos</Eyebrow>
          <Heading>{ind.challenges.title}</Heading>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ind.challenges.items.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-3xl border border-ink/5 bg-white p-7">
                <span className="font-display text-sm font-bold text-brand">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark className="overflow-hidden">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow light>Nuestro enfoque</Eyebrow>
            <Heading>{ind.approach.title}</Heading>
            {ind.approach.text && <p className="mt-5 text-white/65">{ind.approach.text}</p>}
          </Reveal>
          <div className="lg:col-span-7">
            {ind.approach.bullets && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {ind.approach.bullets.map((b) => (
                  <li key={b} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> {b}
                  </li>
                ))}
              </ul>
            )}
            {ind.approach.items && (
              <div className="grid gap-4 sm:grid-cols-2">
                {ind.approach.items.map((a) => (
                  <div key={a.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="font-display text-lg font-bold">{a.title}</h3>
                    <p className="mt-2 text-sm text-white/65">{a.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {ind.pillars && (
        <Section>
          <Reveal className="max-w-3xl">
            <Eyebrow>Arquitectura</Eyebrow>
            <Heading>{ind.pillars.title}</Heading>
            <p className="mt-5 text-ink/65">{ind.pillars.text}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ind.pillars.items.map((p) => (
              <div key={p.title} className="flex flex-col rounded-3xl border border-ink/5 bg-white p-7 shadow-sm">
                <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{p.text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {ind.outcomes.items.length > 0 && (
        <Section className={ind.pillars ? 'bg-mist' : ''}>
          <Reveal className="max-w-3xl">
            <Eyebrow>Resultados</Eyebrow>
            <Heading>{ind.outcomes.title}</Heading>
            {ind.outcomes.text && <p className="mt-5 text-ink/65">{ind.outcomes.text}</p>}
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ind.outcomes.items.map((o) => (
              <div key={o.title} className="rounded-3xl bg-ink p-7 text-white">
                <div className="h-1 w-10 rounded-full bg-brand-gradient" />
                <h3 className="mt-5 font-display text-lg font-bold">{o.title}</h3>
                {o.text && <p className="mt-2 text-sm text-white/65">{o.text}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      <ContactSection title={ind.formTitle} lead={ind.outcomes.items.length === 0 ? ind.outcomes.title : undefined} variant="industry" />
    </>
  )
}
