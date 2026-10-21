import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { ArrowLeft } from 'lucide-react'
import { getPost, type Post } from '../lib/posts'
import { Container, Eyebrow, GlowBg, Seo } from '../components/ui'
import { ContactSection } from '../components/blocks'
import NotFound from './NotFound'

export default function PostPage() {
  const { slug = '' } = useParams()
  const [post, setPost] = useState<Post | null | undefined>(undefined)
  useEffect(() => {
    setPost(undefined)
    getPost(slug).then(setPost)
  }, [slug])

  if (post === null) return <NotFound />

  return (
    <>
      {post && <Seo title={post.title} description={post.excerpt} />}
      <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-white lg:pt-44">
        <GlowBg />
        <Container className="relative max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Volver al blog
          </Link>
          {post ? (
            <>
              <div className="mt-8"><Eyebrow light>{post.category}{post.client ? ` · ${post.client}` : ''}</Eyebrow></div>
              <h1 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
              <p className="mt-6 text-sm text-white/50">
                {new Date(post.published_at + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </>
          ) : (
            <div className="mt-8 h-32 animate-pulse rounded-2xl bg-white/5" />
          )}
        </Container>
      </section>
      {post && (
        <article className="py-16 sm:py-20">
          <Container className="max-w-3xl">
            {post.cover_url && <img src={post.cover_url} alt="" className="mb-12 aspect-[16/10] w-full rounded-3xl object-cover object-top shadow-2xl shadow-ink/20" />}
            <div
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-brand prose-strong:text-ink prose-li:marker:text-brand"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content_html) }}
            />
          </Container>
        </article>
      )}
      <ContactSection />
    </>
  )
}
