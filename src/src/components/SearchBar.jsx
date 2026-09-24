import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cases, clients, files } from '../data/mockData.js'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!q.trim()) return null
    const term = q.toLowerCase()
    return {
      clients: clients.filter((c) => c.name.toLowerCase().includes(term)).slice(0, 3),
      cases: cases.filter((c) => c.name.toLowerCase().includes(term) || c.number.includes(term)).slice(0, 3),
      files: files.filter((f) => !f.trashed && f.name.toLowerCase().includes(term)).slice(0, 3),
    }
  }, [q])

  const hasResults = results && (results.clients.length || results.cases.length || results.files.length)

  return (
    <div className="topbar-search" style={{ position: 'relative' }}>
      <div className="search-field">
        <span className="icon">⌕</span>
        <input
          placeholder="Buscar cliente, expediente o documento…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
        />
      </div>
      {focused && q.trim() && (
        <div className="notif-panel" style={{ top: 44, left: 0, right: 'auto' }}>
          {!hasResults && <div className="notif-item muted">Sin resultados para “{q}”.</div>}
          {results.clients.length > 0 && (
            <>
              <div className="notif-panel-head">Clientes</div>
              {results.clients.map((c) => (
                <div key={c.id} className="notif-item" onClick={() => navigate('/clientes')}>{c.name}</div>
              ))}
            </>
          )}
          {results.cases.length > 0 && (
            <>
              <div className="notif-panel-head">Expedientes</div>
              {results.cases.map((c) => (
                <div key={c.id} className="notif-item" onClick={() => navigate(`/expedientes/${c.id}`)}>
                  #{c.number} · {c.name}
                </div>
              ))}
            </>
          )}
          {results.files.length > 0 && (
            <>
              <div className="notif-panel-head">Documentos</div>
              {results.files.map((f) => (
                <div key={f.id} className="notif-item" onClick={() => navigate('/archivos')}>{f.name}</div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
