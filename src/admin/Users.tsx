import { useEffect, useState } from 'react'
import { Loader2, ShieldCheck } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth, type Profile } from './auth'
import { PageTitle } from './Dashboard'
import { cx } from '../components/ui'

const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }) : '—')

function Toggle({ on, disabled, onChange, label }: { on: boolean; disabled?: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={cx('relative h-6 w-11 shrink-0 rounded-full transition disabled:opacity-40', on ? 'bg-emerald-500' : 'bg-ink/15')}
    >
      <span className={cx('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition', on ? 'left-[22px]' : 'left-0.5')} />
    </button>
  )
}

export default function UsersPage() {
  const { profile: me, refreshProfile } = useAuth()
  const [users, setUsers] = useState<Profile[] | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)

  async function load() {
    if (!supabase) return
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: true })
    if (error) setErr(error.message)
    setUsers((data as Profile[]) ?? [])
  }
  useEffect(() => {
    load()
  }, [])

  async function update(u: Profile, patch: Partial<Profile>) {
    if (!supabase || !me) return
    setBusy(u.id)
    setErr(null)
    const grants = patch.can_view_contacts === true || patch.role === 'admin'
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...patch, ...(grants ? { approved_by: me.id, approved_at: new Date().toISOString() } : {}) })
      .eq('id', u.id)
      .select('*')
      .single()
    setBusy(null)
    if (error) return setErr(error.message)
    setUsers((list) => list?.map((x) => (x.id === u.id ? (data as Profile) : x)) ?? null)
    if (u.id === me.id) refreshProfile()
  }

  const pending = users?.filter((u) => u.role !== 'admin' && !u.can_view_contacts) ?? []

  return (
    <div className="p-4 sm:p-8">
      <PageTitle title="Usuarios y accesos" text="Las personas del equipo aparecen acá después de iniciar sesión por primera vez con su cuenta @crubyt.com." />

      {pending.length > 0 && (
        <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-ink/70">
          <strong className="text-ink">{pending.length}</strong> {pending.length === 1 ? 'persona espera' : 'personas esperan'} acceso a la base de contactos.
        </div>
      )}
      {err && <p className="mt-4 rounded-2xl bg-brand-50 p-4 text-sm text-brand-700">{err}</p>}

      <div className="mt-6 overflow-hidden rounded-3xl border border-ink/5 bg-white">
        {users === null ? (
          <div className="flex justify-center p-16"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/5 text-xs uppercase tracking-wider text-ink/40">
                <tr>
                  <th className="px-5 py-3 font-semibold">Usuario</th>
                  <th className="px-5 py-3 font-semibold">Ver contactos</th>
                  <th className="px-5 py-3 font-semibold">Admin</th>
                  <th className="hidden px-5 py-3 font-semibold md:table-cell">Alta</th>
                  <th className="hidden px-5 py-3 font-semibold md:table-cell">Último acceso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {users.map((u) => {
                  const self = u.id === me?.id
                  const admin = u.role === 'admin'
                  return (
                    <tr key={u.id}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {u.avatar_url ? (
                            <img src={u.avatar_url} alt="" className="h-9 w-9 rounded-full" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mist font-bold text-ink/60">{u.email[0].toUpperCase()}</div>
                          )}
                          <div>
                            <p className="flex items-center gap-1.5 font-semibold text-ink">
                              {u.full_name ?? u.email.split('@')[0]} {self && <span className="text-xs font-normal text-ink/40">(tú)</span>}
                              {admin && <ShieldCheck className="h-3.5 w-3.5 text-brand" />}
                            </p>
                            <p className="text-ink/55">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Toggle
                            label={`Acceso a contactos de ${u.email}`}
                            on={admin || u.can_view_contacts}
                            disabled={admin || busy === u.id}
                            onChange={(v) => update(u, { can_view_contacts: v })}
                          />
                          {!admin && !u.can_view_contacts && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">Pendiente</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Toggle
                          label={`Rol admin de ${u.email}`}
                          on={admin}
                          disabled={self || busy === u.id}
                          onChange={(v) => update(u, { role: v ? 'admin' : 'member' })}
                        />
                      </td>
                      <td className="hidden px-5 py-4 text-ink/55 md:table-cell">{fmt(u.created_at)}</td>
                      <td className="hidden px-5 py-4 text-ink/55 md:table-cell">{fmt(u.last_seen_at)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-ink/45">
        Los admins ven todos los contactos y gestionan accesos. Para quitarle el acceso a alguien, desactiva "Ver contactos". Si alguien deja Crubyt, suspender su cuenta en Google Workspace le impide volver a iniciar sesión.
      </p>
    </div>
  )
}
