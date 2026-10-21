import { useEffect, useMemo, useState } from 'react'
import { Copy, Download, ExternalLink, Loader2, Mail, RefreshCw, Search, Trash2, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { isAdmin, useAuth } from './auth'
import { PageTitle } from './Dashboard'
import { cx } from '../components/ui'
import { downloadCsv } from './csv'

export type Contact = {
  id: string
  created_at: string
  nombres: string
  apellidos: string | null
  email: string
  telefono: string | null
  rol: string | null
  empresa: string | null
  url_empresa: string | null
  ciudad: string | null
  mensaje: string | null
  page: string | null
  status: Status
  notes: string | null
  email_sent: boolean
  hubspot_contact_id: string | null
  hubspot_synced_at: string | null
  updated_at: string
}

type Status = 'nuevo' | 'contactado' | 'calificado' | 'descartado'
const STATUS: Record<Status, { label: string; cls: string }> = {
  nuevo: { label: 'Nuevo', cls: 'bg-brand-50 text-brand-700' },
  contactado: { label: 'Contactado', cls: 'bg-sky-50 text-sky-700' },
  calificado: { label: 'Calificado', cls: 'bg-emerald-50 text-emerald-700' },
  descartado: { label: 'Descartado', cls: 'bg-ink/5 text-ink/50' },
}

const fmt = (d: string) => new Date(d).toLocaleString('es-AR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const fullName = (c: Contact) => [c.nombres, c.apellidos].filter(Boolean).join(' ')
const pageName = (u: string | null) => {
  if (!u) return '—'
  try {
    return new URL(u).pathname.replace(/\/$/, '') || '/'
  } catch {
    return u
  }
}

const CSV_COLS: (keyof Contact & string)[] = ['created_at', 'nombres', 'apellidos', 'email', 'telefono', 'rol', 'empresa', 'url_empresa', 'ciudad', 'mensaje', 'page', 'status', 'notes', 'hubspot_contact_id']

export default function Contacts() {
  const { profile } = useAuth()
  const [rows, setRows] = useState<Contact[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<Status | 'todos'>('todos')
  const [selected, setSelected] = useState<Contact | null>(null)

  async function load() {
    if (!supabase) return
    setError(null)
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(2000)
    if (error) setError(error.message)
    setRows((data as Contact[]) ?? [])
  }
  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return (rows ?? []).filter(
      (r) =>
        (status === 'todos' || r.status === status) &&
        (!term || [r.nombres, r.apellidos, r.email, r.empresa, r.mensaje, r.telefono].some((v) => v?.toLowerCase().includes(term))),
    )
  }, [rows, q, status])

  const counts = useMemo(() => {
    const c: Record<string, number> = { todos: rows?.length ?? 0 }
    rows?.forEach((r) => (c[r.status] = (c[r.status] ?? 0) + 1))
    return c
  }, [rows])

  function patchLocal(updated: Contact) {
    setRows((rs) => rs?.map((r) => (r.id === updated.id ? updated : r)) ?? null)
    setSelected(updated)
  }

  return (
    <div className="p-4 sm:p-8">
      <PageTitle title="Contactos" text="Leads recibidos desde el formulario de la web.">
        <div className="flex gap-2">
          <button onClick={load} className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-ink/30">
            <RefreshCw className="h-4 w-4" /> Actualizar
          </button>
          <button
            onClick={() => downloadCsv(filtered, CSV_COLS, 'contactos-crubyt')}
            disabled={!filtered.length}
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            <Download className="h-4 w-4" /> Exportar CSV
          </button>
        </div>
      </PageTitle>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, email, empresa o mensaje…"
            className="w-full rounded-full border border-ink/10 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-brand"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto rounded-full bg-white p-1">
          {(['todos', 'nuevo', 'contactado', 'calificado', 'descartado'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cx('shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition', status === s ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink')}
            >
              {s === 'todos' ? 'Todos' : STATUS[s].label} <span className="opacity-60">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 rounded-2xl bg-brand-50 p-4 text-sm text-brand-700">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-3xl border border-ink/5 bg-white">
        {rows === null ? (
          <div className="flex justify-center p-16"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>
        ) : filtered.length === 0 ? (
          <p className="p-16 text-center text-sm text-ink/50">{rows.length ? 'Ningún contacto coincide con el filtro.' : 'Todavía no llegaron contactos desde la web.'}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/5 text-xs uppercase tracking-wider text-ink/40">
                <tr>
                  <th className="px-5 py-3 font-semibold">Fecha</th>
                  <th className="px-5 py-3 font-semibold">Contacto</th>
                  <th className="px-5 py-3 font-semibold">Empresa</th>
                  <th className="hidden px-5 py-3 font-semibold xl:table-cell">Mensaje</th>
                  <th className="px-5 py-3 font-semibold">Estado</th>
                  <th className="hidden px-5 py-3 font-semibold md:table-cell">HubSpot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {filtered.map((r) => (
                  <tr key={r.id} onClick={() => setSelected(r)} className={cx('cursor-pointer transition hover:bg-mist/60', selected?.id === r.id && 'bg-mist')}>
                    <td className="whitespace-nowrap px-5 py-4 text-ink/55">{fmt(r.created_at)}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{fullName(r)}</p>
                      <p className="text-ink/55">{r.email}</p>
                    </td>
                    <td className="px-5 py-4 text-ink/70">{r.empresa || r.url_empresa || '—'}</td>
                    <td className="hidden max-w-xs truncate px-5 py-4 text-ink/55 xl:table-cell">{r.mensaje || '—'}</td>
                    <td className="px-5 py-4"><span className={cx('rounded-full px-2.5 py-1 text-xs font-semibold', STATUS[r.status].cls)}>{STATUS[r.status].label}</span></td>
                    <td className="hidden px-5 py-4 text-xs md:table-cell">
                      {r.hubspot_synced_at ? <span className="text-emerald-600">Sincronizado</span> : <span className="text-ink/40">Pendiente</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <ContactDrawer
          c={selected}
          canDelete={isAdmin(profile)}
          onClose={() => setSelected(null)}
          onSaved={patchLocal}
          onDeleted={(id) => {
            setRows((rs) => rs?.filter((r) => r.id !== id) ?? null)
            setSelected(null)
          }}
        />
      )}
    </div>
  )
}

function ContactDrawer({ c, canDelete, onClose, onSaved, onDeleted }: { c: Contact; canDelete: boolean; onClose: () => void; onSaved: (c: Contact) => void; onDeleted: (id: string) => void }) {
  const [notes, setNotes] = useState(c.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  useEffect(() => {
    setNotes(c.notes ?? '')
    setConfirmDelete(false)
    setErr(null)
  }, [c.id, c.notes])

  async function save(patch: Partial<Contact>) {
    if (!supabase) return
    setSaving(true)
    setErr(null)
    const { data, error } = await supabase.from('contacts').update(patch).eq('id', c.id).select('*').single()
    setSaving(false)
    if (error) return setErr(error.message)
    onSaved(data as Contact)
  }

  async function remove() {
    if (!supabase) return
    const { error } = await supabase.from('contacts').delete().eq('id', c.id)
    if (error) return setErr(error.message)
    onDeleted(c.id)
  }

  const fields: [string, string | null][] = [
    ['Email', c.email],
    ['Teléfono', c.telefono],
    ['Rol', c.rol],
    ['Empresa', c.empresa],
    ['URL empresa', c.url_empresa],
    ['Ciudad', c.ciudad],
    ['Página de origen', pageName(c.page)],
    ['Recibido', fmt(c.created_at)],
    ['Email de aviso', c.email_sent ? 'Enviado' : 'No enviado'],
    ['HubSpot', c.hubspot_contact_id ? `ID ${c.hubspot_contact_id}` : 'Pendiente de sincronizar'],
  ]

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/30 backdrop-blur-sm" onClick={onClose}>
      <aside className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 border-b border-ink/5 p-6">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">{fullName(c)}</h2>
            <p className="text-sm text-ink/55">{c.empresa || c.email}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-ink/50 hover:bg-mist" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${c.email}?subject=${encodeURIComponent('Crubyt – Re: tu consulta')}`} className="flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
              <Mail className="h-4 w-4" /> Responder
            </a>
            <button onClick={() => navigator.clipboard.writeText(c.email)} className="flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink">
              <Copy className="h-4 w-4" /> Copiar email
            </button>
            {c.page && (
              <a href={c.page} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink">
                <ExternalLink className="h-4 w-4" /> Página
              </a>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Estado</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(Object.keys(STATUS) as Status[]).map((s) => (
                <button
                  key={s}
                  disabled={saving}
                  onClick={() => save({ status: s })}
                  className={cx('rounded-xl border px-3 py-2 text-xs font-semibold transition', c.status === s ? 'border-ink bg-ink text-white' : 'border-ink/10 text-ink/60 hover:border-ink/30')}
                >
                  {STATUS[s].label}
                </button>
              ))}
            </div>
          </div>

          {c.mensaje && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Mensaje</p>
              <p className="mt-2 whitespace-pre-wrap rounded-2xl bg-mist p-4 text-sm text-ink/80">{c.mensaje}</p>
            </div>
          )}

          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {fields.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-ink/40">{k}</dt>
                <dd className="break-words text-sm text-ink">{v || '—'}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Notas internas</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Seguimiento, próximos pasos…"
              className="mt-2 w-full rounded-2xl border border-ink/10 p-4 text-sm outline-none focus:border-brand"
            />
            <button
              disabled={saving || notes === (c.notes ?? '')}
              onClick={() => save({ notes })}
              className="mt-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              {saving ? 'Guardando…' : 'Guardar notas'}
            </button>
          </div>

          {err && <p className="rounded-xl bg-brand-50 p-3 text-sm text-brand-700">{err}</p>}

          {canDelete && (
            <div className="border-t border-ink/5 pt-6">
              {confirmDelete ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-ink/70">¿Eliminar definitivamente este contacto?</span>
                  <button onClick={remove} className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white">Sí, eliminar</button>
                  <button onClick={() => setConfirmDelete(false)} className="rounded-full px-4 py-2 text-xs font-semibold text-ink/60">Cancelar</button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-2 text-sm font-semibold text-ink/40 hover:text-brand">
                  <Trash2 className="h-4 w-4" /> Eliminar contacto
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
