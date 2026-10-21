import { useEffect, useMemo, useState } from 'react'
import { Copy, Download, Loader2, RefreshCw, Search, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { PageTitle } from './Dashboard'
import { downloadCsv } from './csv'

type Subscriber = { id: string; email: string; source: string | null; created_at: string }

const fmt = (d: string) => new Date(d).toLocaleString('es-AR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function Newsletter() {
  const [rows, setRows] = useState<Subscriber[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [confirm, setConfirm] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  async function load() {
    if (!supabase) return
    setError(null)
    const { data, error } = await supabase.from('newsletter_subscribers').select('id,email,source,created_at').order('created_at', { ascending: false }).limit(5000)
    if (error) setError(error.message)
    setRows((data as Subscriber[]) ?? [])
  }
  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return (rows ?? []).filter((r) => !t || r.email.includes(t) || r.source?.toLowerCase().includes(t))
  }, [rows, q])

  const last30 = useMemo(() => (rows ?? []).filter((r) => Date.now() - new Date(r.created_at).getTime() < 30 * 864e5).length, [rows])

  async function remove(id: string) {
    if (!supabase) return
    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id)
    if (error) return setError(error.message)
    setRows((rs) => rs?.filter((r) => r.id !== id) ?? null)
    setConfirm(null)
  }

  async function copyAll() {
    await navigator.clipboard.writeText(filtered.map((r) => r.email).join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="p-4 sm:p-8">
      <PageTitle title="Newsletter" text="Personas suscriptas desde el sitio web.">
        <div className="flex flex-wrap gap-2">
          <button onClick={load} className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-ink/30">
            <RefreshCw className="h-4 w-4" /> Actualizar
          </button>
          <button onClick={copyAll} disabled={!filtered.length} className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-ink/30 disabled:opacity-40">
            <Copy className="h-4 w-4" /> {copied ? '¡Copiados!' : 'Copiar emails'}
          </button>
          <button
            onClick={() => downloadCsv(filtered, ['email', 'created_at', 'source'], 'newsletter-crubyt')}
            disabled={!filtered.length}
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            <Download className="h-4 w-4" /> Exportar CSV
          </button>
        </div>
      </PageTitle>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-ink/5 bg-white p-5">
          <p className="font-display text-3xl font-bold tabular-nums text-ink">{rows?.length ?? '–'}</p>
          <p className="text-sm text-ink/55">Suscriptores totales</p>
        </div>
        <div className="rounded-3xl border border-ink/5 bg-white p-5">
          <p className="font-display text-3xl font-bold tabular-nums text-ink">{rows ? last30 : '–'}</p>
          <p className="text-sm text-ink/55">Últimos 30 días</p>
        </div>
      </div>

      <div className="relative mt-6">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por email o página de origen…"
          className="w-full rounded-full border border-ink/10 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-brand"
        />
      </div>

      {error && <p className="mt-4 rounded-2xl bg-brand-50 p-4 text-sm text-brand-700">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-3xl border border-ink/5 bg-white">
        {rows === null ? (
          <div className="flex justify-center p-16"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>
        ) : filtered.length === 0 ? (
          <p className="p-16 text-center text-sm text-ink/50">{rows.length ? 'Ningún suscriptor coincide con la búsqueda.' : 'Todavía no hay suscriptores.'}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/5 text-xs uppercase tracking-wider text-ink/40">
                <tr>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Fecha</th>
                  <th className="hidden px-5 py-3 font-semibold sm:table-cell">Página de origen</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-mist/60">
                    <td className="px-5 py-3.5 font-medium text-ink">
                      <a href={`mailto:${r.email}`} className="hover:text-brand">{r.email}</a>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-ink/55">{fmt(r.created_at)}</td>
                    <td className="hidden px-5 py-3.5 text-ink/55 sm:table-cell">{r.source || '—'}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-right">
                      {confirm === r.id ? (
                        <span className="inline-flex items-center gap-2 text-xs">
                          <span className="text-ink/60">¿Dar de baja?</span>
                          <button onClick={() => remove(r.id)} className="rounded-full bg-brand px-3 py-1 font-semibold text-white">Sí</button>
                          <button onClick={() => setConfirm(null)} className="rounded-full px-3 py-1 font-semibold text-ink/60">No</button>
                        </span>
                      ) : (
                        <button onClick={() => setConfirm(r.id)} className="rounded-full p-2 text-ink/30 hover:bg-mist hover:text-brand" aria-label={`Dar de baja ${r.email}`} title="Dar de baja">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-ink/45">El CSV se puede importar directo en HubSpot (Contactos → Importar) o en la herramienta de envío de emails.</p>
    </div>
  )
}
