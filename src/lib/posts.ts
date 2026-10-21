import localPosts from '../content/posts.json'
import { supabase } from './supabase'

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  client?: string | null
  type: 'caso' | 'blog'
  cover_url?: string | null
  published_at: string
  content_html: string
}

const FIELDS = 'slug,title,excerpt,category,client,type,cover_url,published_at,content_html'
const local = (localPosts as Post[]).slice().sort((a, b) => b.published_at.localeCompare(a.published_at))

export async function listPosts(type?: Post['type']): Promise<Post[]> {
  if (supabase) {
    let q = supabase.from('posts').select(FIELDS).eq('published', true).order('published_at', { ascending: false })
    if (type) q = q.eq('type', type)
    const { data, error } = await q
    if (!error && data) return data as Post[]
    console.warn('[posts] Supabase no disponible, usando contenido local', error)
  }
  return type ? local.filter((p) => p.type === type) : local
}

export async function getPost(slug: string): Promise<Post | null> {
  if (supabase) {
    const { data, error } = await supabase.from('posts').select(FIELDS).eq('slug', slug).eq('published', true).maybeSingle()
    if (!error) return (data as Post) ?? null
  }
  return local.find((p) => p.slug === slug) ?? null
}
