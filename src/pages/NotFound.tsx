import { Button, Container, GlowBg, Seo } from '../components/ui'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink pt-24 text-white">
      <Seo title="Página no encontrada" />
      <GlowBg />
      <Container className="relative text-center">
        <p className="bg-brand-gradient bg-clip-text font-display text-8xl font-bold text-transparent">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">Esta página no existe (todavía)</h1>
        <p className="mt-3 text-white/60">Puede que se haya movido en la migración del sitio.</p>
        <div className="mt-8"><Button to="/">Volver al inicio</Button></div>
      </Container>
    </section>
  )
}
