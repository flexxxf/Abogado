import React, { useMemo, useState } from 'react'
import { files as initialFiles, cases, users } from '../data/mockData.js'
import FileCard from '../components/FileCard.jsx'
import FileList from '../components/FileList.jsx'
import UploadModal from '../components/UploadModal.jsx'
import TransferModal from '../components/TransferModal.jsx'

const ownerNameById = Object.fromEntries(users.map((u) => [u.id, u.name]))
const caseNameById = Object.fromEntries(cases.map((c) => [c.id, `#${c.number} · ${c.name}`]))

export default function Files() {
  const [files, setFiles] = useState(initialFiles.filter((f) => !f.trashed))
  const [view, setView] = useState('grid')
  const [query, setQuery] = useState('')
  const [caseFilter, setCaseFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [transferFile, setTransferFile] = useState(null)

  const filtered = useMemo(() => {
    return files.filter((f) => {
      const matchesQuery = !query || f.name.toLowerCase().includes(query.toLowerCase())
      const matchesCase = !caseFilter || f.caseId === caseFilter
      const matchesType = !typeFilter || f.type === typeFilter
      return matchesQuery && matchesCase && matchesType
    })
  }, [files, query, caseFilter, typeFilter])

  function handleAction(action, file) {
    if (action === 'transfer') setTransferFile(file)
    if (action === 'delete') setFiles((prev) => prev.filter((f) => f.id !== file.id))
    if (action === 'rename') {
      const name = prompt('Nuevo nombre', file.name)
      if (name) setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, name } : f)))
    }
    // 'open', 'download' y 'share' requieren un backend de almacenamiento real.
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Archivos</h1>
          <div className="sub">{filtered.length} de {files.length} documentos</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline" onClick={() => alert('Las carpetas se guardan localmente en esta demo.')}>+ Carpeta</button>
          <button className="btn btn-primary" onClick={() => setShowUpload(true)}>+ Subir archivo</button>
        </div>
      </div>

      <div className="toolbar">
        <input className="text-field" placeholder="Buscar archivo…" value={query} onChange={(e) => setQuery(e.target.value)} style={{ minWidth: 200, flex: 1, maxWidth: 280 }} />
        <select className="select-field" value={caseFilter} onChange={(e) => setCaseFilter(e.target.value)}>
          <option value="">Todos los expedientes</option>
          {cases.map((c) => <option key={c.id} value={c.id}>{caseNameById[c.id]}</option>)}
        </select>
        <select className="select-field" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Todos los tipos</option>
          {['docx', 'pdf', 'jpg', 'xlsx', 'pptx', 'zip'].map((t) => <option key={t} value={t}>{t.toUpperCase()}</option>)}
        </select>
        <div className="spacer" />
        <div className="view-toggle">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>▦</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>☷</button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="file-grid">
          {filtered.map((f) => <FileCard key={f.id} file={f} onAction={handleAction} />)}
          {filtered.length === 0 && (
            <div className="empty-state" style={{ gridColumn: '1/-1' }}>
              <span className="icon">📂</span>
              <h3>No hay archivos</h3>
              <p>Ajusta los filtros o sube un nuevo documento.</p>
            </div>
          )}
        </div>
      ) : (
        <FileList files={filtered} owners={ownerNameById} onAction={handleAction} />
      )}

      {showUpload && (
        <UploadModal
          cases={cases}
          onClose={() => setShowUpload(false)}
          onUploaded={(created) => setFiles((prev) => [created, ...prev])}
        />
      )}
      {transferFile && <TransferModal file={transferFile} onClose={() => setTransferFile(null)} onSent={() => setTransferFile(null)} />}
    </div>
  )
}
