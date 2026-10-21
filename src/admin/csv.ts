/** Descarga filas como CSV (UTF-8 con BOM para que Excel respete los acentos). */
export function downloadCsv<T extends Record<string, unknown>>(rows: T[], cols: (keyof T & string)[], filename: string) {
  const esc = (v: unknown) => {
    const s = v == null ? '' : String(v)
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
}
