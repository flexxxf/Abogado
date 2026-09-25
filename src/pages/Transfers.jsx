import React, { useState } from 'react'
import { users } from '../data/mockData.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useAppData } from '../context/AppDataContext.jsx'
import { formatSize, formatDateTime, fileIcon } from '../utils.js'

const nameById = Object.fromEntries(users.map((u) => [u.id, u.name]))

export default function Transfers() {
  const { user } = useAuth()
  const [tab, setTab] = useState('recibidas')
  const [savingId, setSavingId] = useState(null)
  const [caseByTransfer, setCaseByTransfer] = useState({})
  const { cases, transfers, updateTransfer } = useAppData()

  const received = transfers.filter((t) => t.toId === user?.id)
  const sent = transfers.filter((t) => t.fromId === user?.id)

  function respond(id, status) {
    if (status === 'Aceptado') {
      if (!caseByTransfer[id]) return
      updateTransfer(id, { status: 'Aceptado', caseId: caseByTransfer[id] })
      setSavingId(null)
      return
    }
    updateTransfer(id, { status: 'Rechazado' })
  }

  const list = tab === 'recibidas' ? received : sent

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Transferencias</h1>
          <div className="sub">Envía y recibe archivos de otros usuarios autorizados</div>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab${tab === 'recibidas' ? ' active' : ''}`} onClick={() => setTab('recibidas')}>Recibidas ({received.length})</div>
        <div className={`tab${tab === 'enviadas' ? ' active' : ''}`} onClick={() => setTab('enviadas')}>Enviadas ({sent.length})</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map((t) => (
          <div key={t.id} className="card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 26 }}>{fileIcon(t.fileName.split('.').pop())}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.fileName}</div>
              <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>
                {tab === 'recibidas' ? `De: ${nameById[t.fromId]}` : `Para: ${nameById[t.toId]}`} · {formatSize(t.size)}
              </div>
              {t.message && <div style={{ fontSize: 13, marginTop: 6 }}>“{t.message}”</div>}
              <div className="muted" style={{ fontSize: 11.5, marginTop: 6 }}>
                Enviado {formatDateTime(t.sentAt)}{t.expiresAt ? ` · Expira ${t.expiresAt}` : ''}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className={`badge ${t.status === 'Pendiente' ? 'badge-pending' : t.status === 'Aceptado' ? 'badge-active' : 'badge-closed'}`}>{t.status}</span>
              {tab === 'recibidas' && t.status === 'Pendiente' && (
                <>
                  {t.allowDownload && <button className="btn btn-outline btn-sm">Descargar</button>}
                  <select className="select-field" value={caseByTransfer[t.id] || ''} onChange={(e) => setCaseByTransfer((current) => ({ ...current, [t.id]: e.target.value }))} aria-label="Expediente destino">
                    <option value="">Expediente destino</option>
                    {cases.map((item) => <option key={item.id} value={item.id}>#{item.number}</option>)}
                  </select>
                  <button className="btn btn-primary btn-sm" disabled={!caseByTransfer[t.id] || savingId === t.id} onClick={() => { setSavingId(t.id); respond(t.id, 'Aceptado') }}>Guardar en expediente</button>
                  <button className="btn btn-danger btn-sm" onClick={() => respond(t.id, 'Rechazado')}>Rechazar</button>
                </>
              )}
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="empty-state">
            <span className="icon">↗</span>
            <h3>No hay transferencias {tab === 'recibidas' ? 'recibidas' : 'enviadas'}</h3>
            <p>Las transferencias que envíes o recibas aparecerán aquí.</p>
          </div>
        )}
      </div>
    </div>
  )
}
