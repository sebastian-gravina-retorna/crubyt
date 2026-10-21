import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CalendarDays, Home, LogOut, ShieldCheck, Users, Inbox, Loader2, Lock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { AuthProvider, canViewContacts, isAdmin, useAuth } from './auth'
import Login from './Login'
import Dashboard from './Dashboard'
import Contacts from './Contacts'
import UsersPage from './Users'
import { cx } from '../components/ui'

function Shell() {
  const { loading, session, profile, signOut } = useAuth()

  if (!supabase)
    return <Centered title="Supabase no configurado" text="Faltan VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en las variables de entorno." />
  if (loading) return <Centered loading />
  if (!session) return <Login />
  if (!profile) return <Centered title="Perfil no encontrado" text="Tu cuenta no tiene perfil. Pide a un administrador que revise tu acceso." action={signOut} />

  const nav = [
    { to: '/admin', label: 'Inicio', icon: Home, show: true, end: true },
    { to: '/admin/contactos', label: 'Contactos', icon: Inbox, show: canViewContacts(profile) },
    { to: '/admin/usuarios', label: 'Usuarios y accesos', icon: Users, show: isAdmin(profile) },
  ]

  return (
    <div className="min-h-screen bg-mist lg:flex">
      <aside className="flex flex-col border-b border-ink/5 bg-ink text-white lg:fixed lg:inset-y-0 lg:w-64 lg:border-b-0">
        <div className="flex items-center justify-between px-5 py-5 lg:block">
          <div className="flex items-center gap-3">
            <img src="/assets/brand/logo-white.webp" alt="Crubyt" className="h-7 w-auto" />
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">Backend</span>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:pb-0">
          {nav.filter((n) => n.show).map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cx('flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition', isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white')
              }
            >
              <Icon className="h-4 w-4" /> {label}
            </NavLink>
          ))}
          <span className="flex shrink-0 cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/30" title="Próximamente">
            <CalendarDays className="h-4 w-4" /> Eventos <span className="ml-auto rounded bg-white/10 px-1.5 text-[10px]">Pronto</span>
          </span>
        </nav>
        <div className="hidden border-t border-white/10 p-4 lg:block">
          <div className="flex items-center gap-3">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="h-9 w-9 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold">{profile.email[0].toUpperCase()}</div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{profile.full_name ?? profile.email}</p>
              <p className="flex items-center gap-1 text-xs text-white/50">
                {isAdmin(profile) && <ShieldCheck className="h-3 w-3" />} {isAdmin(profile) ? 'Admin' : 'Miembro'}
              </p>
            </div>
            <button onClick={signOut} className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white" aria-label="Cerrar sesión" title="Cerrar sesión">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 lg:ml-64">
        <div className="flex items-center justify-end gap-3 px-4 pt-4 lg:hidden">
          <span className="text-xs text-ink/50">{profile.email}</span>
          <button onClick={signOut} className="rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs font-semibold">Salir</button>
        </div>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="contactos" element={canViewContacts(profile) ? <Contacts /> : <NoAccess />} />
          <Route path="usuarios" element={isAdmin(profile) ? <UsersPage /> : <NoAccess />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function NoAccess() {
  return <Centered title="Sin acceso" text="No tienes permiso para ver esta sección. Pide a un administrador que te habilite." inline />
}

export function Centered({ title, text, loading, action, inline }: { title?: string; text?: string; loading?: boolean; action?: () => void; inline?: boolean }) {
  return (
    <div className={cx('flex items-center justify-center p-6', inline ? 'py-32' : 'min-h-screen bg-mist')}>
      {loading ? (
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      ) : (
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl shadow-ink/5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand"><Lock className="h-6 w-6" /></div>
          <h1 className="mt-5 font-display text-xl font-bold text-ink">{title}</h1>
          <p className="mt-2 text-sm text-ink/60">{text}</p>
          {action && <button onClick={action} className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">Cerrar sesión</button>}
        </div>
      )}
    </div>
  )
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Helmet>
        <title>Backend | Crubyt</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Shell />
    </AuthProvider>
  )
}
