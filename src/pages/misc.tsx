import { Mail, Linkedin, Instagram } from 'lucide-react'
import { contact, events } from '../content/site'
import { Button, Container, GlowBg, Reveal, Section, Seo } from '../components/ui'
import { ContactForm, PageHero } from '../components/blocks'

export function Eventos() {
  return (
    <>
      <Seo title="Eventos" description="Eventos, workshops y foros donde participa Crubyt." />
      <PageHero eyebrow="Nuestra experiencia" title="Eventos" lead="Compartimos lo que aprendemos en la comunidad Cloud Native: summits, workshops y foros de liderazgo." />
      <Section className="bg-mist">
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.07}>
              <div className="group overflow-hidden rounded-3xl bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={e.image} alt={e.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <p className="p-6 font-display text-lg font-bold text-ink">{e.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}

export function Contacto() {
  return (
    <>
      <Seo title="Hablemos" description="Hablemos de tu próximo desafío Cloud." />
      <section className="relative overflow-hidden bg-ink pb-24 pt-36 text-white lg:pt-44">
        <GlowBg />
        <Container className="relative grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">Hablemos de tu próximo desafío Cloud</h1>
            <p className="mt-6 max-w-md text-lg text-white/70">Cuéntanos qué estás necesitando y nuestro equipo te ayudará a encontrar el mejor camino.</p>
            <div className="mt-10 space-y-4">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/80 hover:text-white"><Mail className="h-5 w-5 text-brand" /> {contact.email}</a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white"><Linkedin className="h-5 w-5 text-brand" /> linkedin.com/company/crubyt</a>
              <a href={contact.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white"><Instagram className="h-5 w-5 text-brand" /> @crubytinc</a>
            </div>
            <img src="/assets/brand/robot-contact.webp" alt="" className="mt-12 hidden w-60 lg:block" />
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  )
}

export function Privacidad() {
  return (
    <>
      <Seo title="Política de privacidad" />
      <PageHero eyebrow="Legal" title="Política de privacidad y uso de datos" />
      <Section>
        <div className="prose max-w-3xl">
          <p>
            Los datos que nos envías a través de los formularios de este sitio (nombre, correo, teléfono, empresa y mensaje) se utilizan únicamente para responder a tu consulta y,
            si te suscribes, para enviarte nuestro newsletter. Puedes solicitar la baja o eliminación de tus datos escribiendo a <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </p>
          <p className="text-sm text-ink/50">Texto provisorio: reemplazar por la política legal vigente de Crubyt.</p>
        </div>
        <div className="mt-8"><Button to="/contacto" variant="outline">Contactar</Button></div>
      </Section>
    </>
  )
}
