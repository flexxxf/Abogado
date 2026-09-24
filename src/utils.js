export function formatSize(bytes) {
  if (bytes == null) return '—'
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(1)} MB`
  return `${(mb / 1024).toFixed(2)} GB`
}

export function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('es-DO', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('es-DO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `hace ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `hace ${hours} h`
  const days = Math.floor(hours / 24)
  return `hace ${days} d`
}

const ICONS = {
  docx: '📄', doc: '📄',
  pdf: '📕',
  jpg: '🖼️', jpeg: '🖼️', png: '🖼️', webp: '🖼️',
  xls: '📊', xlsx: '📊',
  ppt: '📽️', pptx: '📽️',
  txt: '📃',
  zip: '🗜️',
  folder: '📁',
}

export function fileIcon(type) {
  return ICONS[type] || '📎'
}

export function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export function statusBadgeClass(status) {
  const map = {
    Activo: 'badge-active',
    Pendiente: 'badge-pending',
    Cerrado: 'badge-closed',
    Archivado: 'badge-archived',
  }
  return map[status] || 'badge-closed'
}
