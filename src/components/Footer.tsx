import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Mail } from 'lucide-react'
import { contact, marquee } from '../content/site'
import { Container, Marquee } from './ui'
import Newsletter from './Newsletter'

const cols = [
  {
    title: 'Servicios',
    links: [
      ['Gen AI & Open Source', '/integracion-de-gen-ai-open-source'],
      ['FinOps', '/finops'],
      ['Ingeniería de Plataformas', '/ingenieria-de-plataformas'],
      ['Ciberseguridad', '/ciberseguridad'],
    ],
  },
  {
    title: 'Industrias',
    links: [
      ['Startups y Scaleups', '/startups-y-scaleups'],
      ['Servicios Financieros', '/servicios-financieros'],
      ['Ecommerce & Retail', '/ecommerce-retail'],
      ['Telecomunicaciones', '/telecomunicaciones'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Nosotros', '/nosotros'],
      ['Cómo trabajamos', '/como-trabajamos'],
      ['Casos de Éxito', '/casos-de-exito'],
      ['Blog', '/blog'],
      ['Eventos', '/eventos'],
      ['Contáctanos', '/contacto'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="border-y border-white/10 bg-ink-800/60 text-white/80">
        <Marquee items={marquee} />
      </div>
      <Container className="grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <img src="/assets/brand/logo-white.webp" alt="Crubyt" className="h-10 w-auto" width={262} height={100} />
          <p className="mt-5 max-w-xs font-display text-xl font-semibold text-white/90">Cloud Native and Innovation Partner</p>
          <div className="mt-6 flex gap-3">
            <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-white/15 p-2.5 transition hover:border-brand hover:text-brand">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/15 p-2.5 transition hover:border-brand hover:text-brand">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`mailto:${contact.email}`} aria-label="Email" className="rounded-full border border-white/15 p-2.5 transition hover:border-brand hover:text-brand">
              <Mail className="h-4 w-4" />
            </a>
          </div>
          <a href={`mailto:${contact.email}`} className="mt-4 inline-block text-sm text-white/60 hover:text-white">{contact.email}</a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([l, to]) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-white/75 transition hover:text-white">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Newsletter</p>
          <p className="mt-4 text-sm text-white/70">Recibe nuestros últimos casos y artículos directo en tu correo.</p>
          <Newsletter dark className="mt-4" />
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Crubyt. All rights reserved.</span>
        <span>{contact.tagline}</span>
      </Container>
    </footer>
  )
}
