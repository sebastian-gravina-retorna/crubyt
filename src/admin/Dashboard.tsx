import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Inbox, Mail, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { canViewContacts, isAdmin, useAuth } from './auth'

export function PageTitle({ title, text, children }: { title: string; text?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h1>
        {text && <p className="mt-1 text-sm text-ink/55">{text}</p>}
      </div>
      {children}
    </div>
  )
}

type Stats = { contacts: number; nuevos: number; week: number; pendingUsers: number; subscribers: number }

export default function Dashboard() {
  const { profile } = useAuth()
  const [stats, setStats] = useState<Partial<Stats>>({})
  const contacts = canViewContacts(profile)
  const admin = isAdmin(profile)

  useEffect(() => {
    if (!supabase) return
    const sb = supabase
    const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString()
    const count = async (q: PromiseLike<{ count: number | null }>) => (await q).count ?? 0
    ;(async () => {
      const s: Partial<Stats> = {}
      if (contacts) {
        s.contacts = await count(sb.from('contacts').select('*', { count: 'exact', head: true }))
        s.nuevos = await count(sb.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'nuevo'))
        s.week = await count(sb.from('contacts').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo))
        s.subscribers = await count(sb.from('newsletter_subscribers').select('*', { count: 'exact', head: true }))
      }
      if (admin) s.pendingUsers = await count(sb.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'member').eq('can_view_contacts', false))
      setStats(s)
    })()
  }, [contacts, admin])

  const first = profile?.full_name?.split(' ')[0]

  return (
    <div className="p-4 sm:p-8">
      <PageTitle title={`Hola${first ? `, ${first}` : ''}`} text="Panel interno de Crubyt." />

      {!contacts && !admin && (
        <div className="mt-8 flex gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <Clock className="h-6 w-6 shrink-0 text-amber-600" />
          <div>
            <p className="font-semibold text-ink">Tu acceso está pendiente de aprobación</p>
            <p className="mt-1 text-sm text-ink/60">Un administrador debe habilitarte para ver la base de contactos. Ya quedaste registrado, no necesitas hacer nada más.</p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {contacts && (
          <>
            <Stat icon={Inbox} label="Contactos totales" value={stats.contacts} to="/admin/contactos" />
            <Stat icon={Inbox} label="Sin gestionar (nuevos)" value={stats.nuevos} accent to="/admin/contactos" />
            <Stat icon={Clock} label="Últimos 7 días" value={stats.week} />
            <Stat icon={Mail} label="Suscriptores newsletter" value={stats.subscribers} to="/admin/newsletter" />
          </>
        )}
        {admin && <Stat icon={Users} label="Usuarios sin acceso" value={stats.pendingUsers} accent={!!stats.pendingUsers} to="/admin/usuarios" />}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {contacts && (
          <Link to="/admin/contactos" className="group flex items-center justify-between rounded-3xl bg-ink p-6 text-white">
            <div>
              <p className="font-display text-lg font-bold">Contactos del formulario web</p>
              <p className="mt-1 text-sm text-white/60">Gestiona leads, cambia su estado y exporta a CSV.</p>
            </div>
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
        )}
        {admin && (
          <Link to="/admin/usuarios" className="group flex items-center justify-between rounded-3xl border border-ink/5 bg-white p-6">
            <div>
              <p className="font-display text-lg font-bold text-ink">Usuarios y accesos</p>
              <p className="mt-1 text-sm text-ink/60">Autoriza quién del equipo puede ver los contactos.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-ink transition group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  )
}

function Stat({ icon: Icon, label, value, accent, to }: { icon: typeof Inbox; label: string; value?: number; accent?: boolean; to?: string }) {
  const body = (
    <>
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent ? 'bg-brand-50 text-brand' : 'bg-mist text-ink/60'}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-ink tabular-nums">{value ?? '–'}</p>
      <p className="mt-1 text-sm text-ink/55">{label}</p>
    </>
  )
  return to ? (
    <Link to={to} className="block rounded-3xl border border-ink/5 bg-white p-6 transition hover:border-ink/15 hover:shadow-lg hover:shadow-ink/5">{body}</Link>
  ) : (
    <div className="rounded-3xl border border-ink/5 bg-white p-6">{body}</div>
  )
}
