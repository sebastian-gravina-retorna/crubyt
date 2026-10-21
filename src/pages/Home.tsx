import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Boxes, Layers, ShieldAlert, Wallet } from 'lucide-react'
import { challenges, ecosystem, hexServices, impact, marquee, stats } from '../content/site'
import { listPosts, type Post } from '../lib/posts'
import { Button, Container, CountUp, Eyebrow, GlowBg, Heading, Hexagon, Marquee, Reveal, Section, Seo } from '../components/ui'
import { ClientsGrid, ContactSection, PostCard } from '../components/blocks'

const challengeIcons = [Layers, Boxes, ShieldAlert, Wallet]
const rotating = ['Co-Create', 'Escalar sin caos', 'Operar con control']

function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % rotating.length), 2800)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <GlowBg />
      <Container className="relative grid items-center gap-12 pb-16 pt-36 lg:grid-cols-12 lg:pb-24 lg:pt-48">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand" /> AWS Advanced Tier Services Partner
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Your Cloud Native and Innovation <span className="bg-brand-gradient bg-clip-text text-transparent">Partner</span>
            </h1>
            <div className="mt-6 h-9 overflow-hidden font-display text-2xl font-semibold text-brand-400 sm:text-3xl">
              <motion.div key={i} initial={{ y: 36, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                {rotating[i]}
              </motion.div>
            </div>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Potenciamos la evolución tecnológica de tu organización con soluciones cloud-native, FinOps e IA diseñadas para escalar sin caos.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/como-trabajamos">Explore More</Button>
              <Button to="#servicios" variant="ghost">View All Services</Button>
            </div>
          </motion.div>
        </div>
        <motion.div className="relative hidden lg:col-span-5 lg:block" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="absolute inset-8 rounded-full bg-brand/30 blur-3xl" />
          <img src="/assets/brand/robot-contact.webp" alt="Robot Crubyt" className="relative mx-auto w-full max-w-[360px] drop-shadow-2xl" width={424} height={399} />
        </motion.div>
      </Container>
      <div className="relative border-t border-white/10 bg-white/[0.03] text-white/85">
        <Marquee items={marquee} />
      </div>
    </section>
  )
}

function Services() {
  return (
    <Section id="servicios" className="bg-mist">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Qué hacemos</Eyebrow>
          <Heading>Servicios para operar la nube con criterio</Heading>
          <p className="mt-5 text-ink/65">Cinco frentes, un mismo objetivo: que tu plataforma escale con control, seguridad y costos previsibles.</p>
          <img src="/assets/brand/hex-services.webp" alt="" className="mt-8 hidden w-72 lg:block" loading="lazy" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {hexServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05} className={i === 0 ? 'sm:col-span-2' : ''}>
              <Link to={s.to} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white p-7 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-ink/5">
                <Hexagon className="mb-6 flex h-12 w-14 items-center justify-center bg-ink font-display text-sm font-bold text-white transition group-hover:bg-brand">
                  {String(i + 1).padStart(2, '0')}
                </Hexagon>
                <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{s.text}</p>
                <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-ink/25 transition group-hover:text-brand" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Challenges() {
  return (
    <Section>
      <Reveal className="max-w-3xl">
        <Eyebrow>Diagnóstico</Eyebrow>
        <Heading>Los desafíos que encontramos en equipos cloud</Heading>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {challenges.map((c, i) => {
          const Icon = challengeIcons[i]
          return (
            <Reveal key={c.title} delay={i * 0.07}>
              <div className="h-full rounded-3xl border border-ink/5 bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{c.text}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

function Impact() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <GlowBg />
      <Container className="relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            It's about <span className="bg-brand-gradient bg-clip-text text-transparent">how you operate.</span>
          </p>
          <h2 className="mt-8 font-display text-2xl font-semibold text-white/90">{impact.title}</h2>
          <p className="mt-4 text-white/70">{impact.text}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">¿Tu tecnología está preparada para sostener lo que tu negocio necesita?</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-bold text-white">
                    <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function Ecosystem() {
  return (
    <Section>
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>Stack</Eyebrow>
        <Heading>Nuestro ecosistema</Heading>
        <p className="mt-4 text-ink/60">Platform Engineering • FinOps • Cloud • GenAI • Cybersecurity</p>
      </Reveal>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ecosystem.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.05}>
            <div className="h-full rounded-2xl border border-ink/5 bg-mist/60 p-6">
              <p className="font-display text-sm font-bold uppercase tracking-wider text-ink">{g.group}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <span key={t} className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/75">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Cases() {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    listPosts('caso').then((p) => setPosts(p.slice(0, 3)))
  }, [])
  return (
    <Section className="bg-mist">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <Eyebrow>Casos de éxito</Eyebrow>
          <Heading>Co-Creando la Evolución</Heading>
        </Reveal>
        <Button to="/casos-de-exito" variant="outline">Ver todos los casos</Button>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07}><PostCard post={p} /></Reveal>
        ))}
      </div>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <Seo title="Crubyt – Your cloud native AI partner" description="Tu partner Cloud Native e innovación: Ingeniería de Plataformas, FinOps, Ciberseguridad y Gen AI sobre AWS." />
      <Hero />
      <Challenges />
      <Services />
      <Impact />
      <Ecosystem />
      <Cases />
      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Confianza</Eyebrow>
          <Heading>Clientes que confían en nosotros</Heading>
        </Reveal>
        <div className="mt-12"><ClientsGrid /></div>
      </Section>
      <ContactSection />
    </>
  )
}
