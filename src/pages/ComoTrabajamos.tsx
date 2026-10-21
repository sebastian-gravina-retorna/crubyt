import { Compass, Rocket, ShieldCheck, Users } from 'lucide-react'
import { awsBadges, partnerLogos } from '../content/site'
import { Button, Eyebrow, Heading, Reveal, Section, Seo } from '../components/ui'
import { ContactSection, PageHero } from '../components/blocks'

const principles = [
  { icon: Compass, title: 'Estrategia antes que implementación' },
  { icon: ShieldCheck, title: 'Gobierno y seguridad desde el inicio' },
  { icon: Rocket, title: 'Velocidad sin perder control' },
  { icon: Users, title: 'Construimos junto a tu equipo' },
]

const model = [
  { title: 'Diagnóstico y alineación', text: 'Auditamos tu plataforma, tus objetivos de negocio y tus riesgos operativos — antes de recomendar cualquier cosa. Sin suposiciones, con contexto completo.' },
  { title: 'Diseño del modelo operativo', text: 'Definimos un blueprint técnico y operativo construido para tu escala — cumplimiento normativo, resiliencia y preparado para lo que viene.' },
  { title: 'Implementación estratégica', text: 'No entregamos un deck y desaparecemos. Nos quedamos en la ejecución — supervisando, guiando y construyendo junto a tu equipo.' },
  { title: 'Consolidación y transferencia', text: 'Procesos estandarizados, decisiones documentadas, equipos internos más fuertes. Te dejamos una operación que funciona sin nosotros.' },
]

export default function ComoTrabajamos() {
  return (
    <>
      <Seo title="Cómo trabajamos" description="Innovar con intención: nuestra forma de trabajar define el resultado." />
      <PageHero eyebrow="Cómo trabajamos" title="Innovar con Intención" lead="Nuestra forma de trabajar define el resultado." image="/assets/photos/aws-event.webp">
        <Button to="/contacto">Contáctanos</Button>
      </PageHero>

      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>Principios</Eyebrow>
          <Heading>Nuestros principios</Heading>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-ink/5 bg-mist p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-6 font-display text-lg font-bold text-ink">{title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark>
        <Reveal className="max-w-3xl">
          <Eyebrow light>Modelo</Eyebrow>
          <Heading>Nuestro modelo de trabajo</Heading>
          <p className="mt-5 text-white/65">Diseñamos arquitecturas alineadas a mejores prácticas del ecosistema AWS y estándares Cloud Native.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {model.map((m, i) => (
            <Reveal key={m.title} delay={(i % 2) * 0.08}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:border-brand/40">
                <p className="font-display text-5xl font-bold text-white/10 transition group-hover:text-brand/60">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-display text-xl font-bold">{m.title}</h3>
                <p className="mt-3 text-white/65">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Heading>Criterio estratégico integrado a tu operación, no impuesto sobre ella</Heading>
            <p className="mt-6 text-lg text-ink/65">
              No reemplazamos a tu equipo técnico — diseñamos con ellos. Acompañamos decisiones, supervisamos la implementación y garantizamos coherencia en cada etapa del ciclo, con roles claros y objetivos compartidos.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-mist p-8">
              <p className="font-display text-lg font-bold text-ink">Como partner Advanced de AWS, trabajamos alineados a sus mejores prácticas y marcos de arquitectura.</p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {awsBadges.map((b) => (
                  <img key={b.name} src={b.logo} alt={b.name} title={b.name} className="w-full rounded-xl bg-white p-2" loading="lazy" />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-mist">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Ecosistema</Eyebrow>
          <Heading>Nuestras alianzas estratégicas</Heading>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {partnerLogos.map((p) => (
            <div key={p.name} className="flex h-24 items-center justify-center rounded-2xl bg-white p-5">
              <img src={p.logo} alt={p.name} className="max-h-12 w-auto object-contain opacity-70 transition hover:opacity-100" loading="lazy" />
            </div>
          ))}
        </div>
      </Section>

      <ContactSection />
    </>
  )
}
