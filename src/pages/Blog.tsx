import { useEffect, useMemo, useState } from 'react'
import { listPosts, type Post } from '../lib/posts'
import { Container, Reveal, Seo, cx } from '../components/ui'
import { PageHero, PostCard } from '../components/blocks'
import Newsletter from '../components/Newsletter'

const copy = {
  blog: {
    eyebrow: 'Blog',
    title: 'Ingeniería de plataformas: historias de innovación, escala y crecimiento',
    lead: '¡Bienvenido a nuestra fuente definitiva de nuevas perspectivas! Explora contenidos cuidadosamente seleccionados para inspirar, transformar y motivar a los equipos de ingeniería.',
  },
  casos: {
    eyebrow: 'Casos de Éxito',
    title: 'Resultados reales. Impacto medible en la nube.',
    lead: 'Descubre cómo empresas líderes en banca, fintech, telecomunicaciones y tecnología optimizaron costos, aceleraron su desarrollo y fortalecieron su seguridad en la nube junto a Crubyt.',
  },
}

export default function Blog({ mode }: { mode: 'blog' | 'casos' }) {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [cat, setCat] = useState('Todos')
  useEffect(() => {
    setPosts(null)
    listPosts(mode === 'casos' ? 'caso' : undefined).then(setPosts)
  }, [mode])
  const cats = useMemo(() => ['Todos', ...new Set((posts ?? []).map((p) => p.category))], [posts])
  const shown = (posts ?? []).filter((p) => cat === 'Todos' || p.category === cat)
  const c = copy[mode]

  return (
    <>
      <Seo title={c.eyebrow} description={c.lead} />
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="bg-mist py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap gap-2">
            {cats.map((x) => (
              <button
                key={x}
                onClick={() => setCat(x)}
                className={cx('rounded-full px-4 py-2 text-sm font-semibold transition', cat === x ? 'bg-ink text-white' : 'bg-white text-ink/70 hover:text-ink')}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts === null
              ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-96 animate-pulse rounded-3xl bg-white" />)
              : shown.map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                    <PostCard post={p} />
                  </Reveal>
                ))}
          </div>
          {posts?.length === 0 && <p className="mt-10 text-ink/60">Pronto publicaremos nuevos contenidos.</p>}

          <div className="mt-20 grid items-center gap-8 rounded-[2rem] bg-ink p-8 text-white sm:p-12 lg:grid-cols-2">
            <div>
              <p className="font-display text-2xl font-bold">Subscribe to our Newsletter</p>
              <p className="mt-2 text-white/65">Recibe los últimos posts directo en tu correo.</p>
            </div>
            <Newsletter dark />
          </div>
        </Container>
      </section>
    </>
  )
}
