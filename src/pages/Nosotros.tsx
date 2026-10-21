import { awsBadges, team } from '../content/site'
import { Button, Eyebrow, Heading, Reveal, Section, Seo } from '../components/ui'
import { ContactSection, PageHero } from '../components/blocks'

const pillars = ['Cloud Native', 'Open Source', 'FinOps', 'DevSecOps']
const industries = ['Banca', 'Fintech', 'Retail', 'Salud']
const values = ['Innovación continua', 'Aprendizaje constante', 'Colaboración real']
const ecosystem = ['AWS Advanced Partner', 'GitHub', 'HashiCorp', 'Terraform', 'Kubernetes', 'Prometheus', 'Grafana', 'ArgoCD']
const tribe = [
  { title: 'Tu voz es nuestra brújula', text: 'Seas especialista técnico o un alma creativa, tu perspectiva es la pieza que nos falta.' },
  { title: 'Un espacio para ser humano', text: 'Valoramos tu bienestar, tu risa y tu tiempo. Un entorno que te cuide y te inspire.' },
  { title: 'Aprender como estilo de vida', text: 'Siempre hay alguien dispuesto a enseñarte algo nuevo y alguien ansioso por aprender de ti.' },
  { title: 'Propósito con sentido', text: 'Trabajamos con tecnología, pero nuestro impacto es real. Un futuro digital más humano.' },
]

export default function Nosotros() {
  return (
    <>
      <Seo title="Nosotros" description="El motor de tu innovación, diseñado para el futuro." />
      <PageHero eyebrow="Nosotros" title="El motor de tu innovación, diseñado para el futuro." lead="Más que consultores, somos el aliado que se pone tu camiseta." image="/assets/photos/team-office.webp">
        <Button to="/contacto">Hablemos</Button>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Heading>Nacimos para que la tecnología deje de ser un freno y sea tu mayor impulso.</Heading>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-ink p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Especialidades</p>
              <ul className="mt-4 space-y-2 font-display text-lg font-bold">{pillars.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
            <div className="rounded-3xl bg-brand-gradient p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Industrias</p>
              <ul className="mt-4 space-y-2 font-display text-lg font-bold">{industries.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Filosofía</Eyebrow>
            <Heading>Sistemas vivos para un mundo en movimiento.</Heading>
            <p className="mt-6 text-lg text-ink/65">
              En Crubyt creemos que todo — procesos, plataformas e infraestructuras — debe tener la capacidad de evolucionar y adaptarse. No seguimos tendencias por moda; creemos en la tecnología con impacto.
            </p>
          </Reveal>
          <div className="space-y-4 lg:col-span-6">
            {values.map((v, i) => (
              <Reveal key={v} delay={i * 0.06}>
                <div className="flex items-center gap-6 rounded-3xl bg-white p-6">
                  <span className="font-display text-3xl font-bold text-brand">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl font-bold text-ink">{v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Reveal className="max-w-2xl">
          <Eyebrow>Equipo</Eyebrow>
          <Heading>El equipo detrás de cada transformación.</Heading>
          <p className="mt-5 text-ink/65">Un equipo multidisciplinario de especialistas apasionados por la tecnología y el impacto real.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 6) * 0.05}>
              <figure className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-mist">
                  <img src={m.photo} alt={m.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <figcaption className="mt-4">
                  <p className="font-display font-bold text-ink">{m.name}</p>
                  <p className="text-sm text-ink/55">{m.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow light>Partners & Ecosystem</Eyebrow>
            <Heading>La fuerza de un ecosistema diseñado para ganar</Heading>
            <p className="mt-5 text-white/65">
              Creemos que la verdadera innovación ocurre cuando colaboramos. Por eso, nos rodeamos de los partners líderes del mercado y las mejores tecnologías Open Source, asegurando soluciones modernas, seguras y eficientes.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {ecosystem.map((e) => <span key={e} className="rounded-full border border-white/15 px-4 py-2 text-sm">{e}</span>)}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-3 gap-4">
            {awsBadges.map((b) => (
              <img key={b.name} src={b.logo} alt={b.name} className="w-full rounded-2xl bg-white p-3" loading="lazy" />
            ))}
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Eyebrow>Nuestra promesa</Eyebrow>
            <Heading>Join The Tribe.</Heading>
          </Reveal>
          <Button to="/contacto">¡Quiero ser parte de Crubyt!</Button>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tribe.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-ink/5 bg-mist p-7">
                <p className="font-display text-sm font-bold text-brand">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{t.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ContactSection title="¿Qué tan claro es hoy el funcionamiento de tu plataforma?" />
    </>
  )
}
