import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export const ORG_DOMAIN = 'crubyt.com'

export type Profile = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'admin' | 'member'
  can_view_contacts: boolean
  approved_at: string | null
  created_at: string
  last_seen_at: string | null
}

type AuthState = {
  loading: boolean
  session: Session | null
  profile: Profile | null
  error: string | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const Ctx = createContext<AuthState | null>(null)

const isOrgEmail = (email?: string | null) => !!email && email.toLowerCase().endsWith('@' + ORG_DOMAIN)

/** Error que devuelve Supabase en la URL cuando el trigger rechaza una cuenta fuera de la org */
function readUrlError(): string | null {
  const params = new URLSearchParams(window.location.search + '&' + window.location.hash.replace(/^#/, ''))
  const desc = params.get('error_description')
  if (!desc) return null
  window.history.replaceState(null, '', window.location.pathname)
  return /database error/i.test(desc) ? `Solo se permiten cuentas @${ORG_DOMAIN}.` : desc
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(() => readUrlError())

  const loadProfile = useCallback(async (s: Session | null) => {
    if (!supabase || !s) {
      setProfile(null)
      return
    }
    if (!isOrgEmail(s.user.email)) {
      setError(`Solo se permiten cuentas @${ORG_DOMAIN}.`)
      await supabase.auth.signOut()
      setProfile(null)
      return
    }
    const { data } = await supabase.from('profiles').select('*').eq('id', s.user.id).maybeSingle()
    setProfile((data as Profile) ?? null)
    supabase.rpc('touch_last_seen').then(() => {})
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session)
      await loadProfile(data.session)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s)
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') loadProfile(s)
    })
    return () => sub.subscription.unsubscribe()
  }, [loadProfile])

  const signIn = async () => {
    if (!supabase) return
    setError(null)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`,
        // hd limita el selector de cuentas de Google al dominio de la organización
        queryParams: { hd: ORG_DOMAIN, prompt: 'select_account' },
      },
    })
  }

  const signOut = async () => {
    await supabase?.auth.signOut()
    setProfile(null)
  }

  return (
    <Ctx.Provider value={{ loading, session, profile, error, signIn, signOut, refreshProfile: () => loadProfile(session) }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useAuth fuera de AuthProvider')
  return v
}

export const canViewContacts = (p: Profile | null) => !!p && (p.role === 'admin' || p.can_view_contacts)
export const isAdmin = (p: Profile | null) => p?.role === 'admin'
