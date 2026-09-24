import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cases, clients, users, files as allFiles } from '../data/mockData.js'
import { formatDate, statusBadgeClass, fileIcon, formatSize } from '../utils.js'
import UploadModal from '../components/UploadModal.jsx'
import TransferModal from '../components/TransferModal.jsx'

const clientNameById = Object.fromEntries(clients.map((c) => [c.id, c.name]))
const lawyerNameById = Object.fromEntries(users.map((u) => [u.id, u.name]))

export default function CaseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = cases.find((c) => c.id === id)
  const [tab, setTab] = useState('archivos')
  const [showUpload, setShowUpload] = useState(false)
  const [transferFile, setTransferFile] = useState(null)

  const files = useMemo(() => allFiles.filter((f) => f.caseId === id && !f.trashed), [id])

  if (!item) {
    return (
      <div className="empty-state">
        <span className="icon">⚖</span>
        <h3>Expediente no encontrado</h3>
        <button className="btn btn-outline mt-16" onClick={() => navigate('/expedientes')}>Volver a expedientes</button>
      </div>
    )
  }

  return (
    <div>
      <button className="btn-ghost btn-sm" style={{ marginBottom: 10, padding: '4px 0' }} onClick={() => navigate('/expedientes')}>← Expedientes</button>

      <div className="detail-head">
        <div>
          <div className="muted" style={{ fontSize: 12.5 }}>EXPEDIENTE #{item.number}</div>
          <h1>{item.name}</h1>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className={`badge ${statusBadgeClass(item.status)}`}>{item.status}</span>
          <button className="btn btn-outline btn-sm" onClick={() => setShowUpload(true)}>+ Subir archivo</button>
        </div>
      </div>

      <div className="detail-meta-grid">
        <div className="item"><div className="label">Cliente</div><div className="value">{clientNameById[item.clientId]}</div></div>
        <div className="item"><div className="label">Tipo de caso</div><div className="value">{item.type}</div></div>
        <div className="item"><div className="label">Abogado responsable</div><div className="value">{lawyerNameById[item.lawyerId]}</div></div>
        <div className="item"><div className="label">Creado</div><div className="value">{formatDate(item.createdAt)}</div></div>
        <div className="item"><div className="label">Actualizado</div><div className="value">{formatDate(item.updatedAt)}</div></div>
        <div className="item"><div className="label">Documentos</div><div className="value">{files.length}</div></div>
      </div>

      <div className="tabs">
        <div className={`tab${tab === 'archivos' ? ' active' : ''}`} onClick={() => setTab('archivos')}>Archivos</div>
        <div className={`tab${tab === 'detalles' ? ' active' : ''}`} onClick={() => setTab('detalles')}>Detalles</div>
        <div className={`tab${tab === 'notas' ? ' active' : ''}`} onClick={() => setTab('notas')}>Notas</div>
      </div>

      {tab === 'archivos' && (
        <div className="file-grid">
          {files.map((f) => (
            <div key={f.id} className="file-card">
              <div className="file-icon">{fileIcon(f.type)}</div>
              <div className="file-name">{f.name}</div>
              <div className="file-meta">{formatSize(f.size)} · {formatDate(f.updatedAt)}</div>
              <button className="btn btn-outline btn-sm mt-8" onClick={() => setTransferFile(f)}>Transferir</button>
            </div>
          ))}
          {files.length === 0 && (
            <div className="empty-state" style={{ gridColumn: '1/-1' }}>
              <span className="icon">📄</span>
              <h3>Sin documentos todavía</h3>
              <p>Sube el primer archivo de este expediente.</p>
            </div>
          )}
        </div>
      )}

      {tab === 'detalles' && (
        <div className="card">
          <div className="section-title">Descripción</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>{item.description || 'Sin descripción registrada.'}</p>
        </div>
      )}

      {tab === 'notas' && (
        <div className="card">
          <div className="section-title">Notas internas</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>{item.notes || 'Sin notas registradas.'}</p>
        </div>
      )}

      {showUpload && (
        <UploadModal cases={[item]} defaultCaseId={item.id} onClose={() => setShowUpload(false)} onUploaded={() => setShowUpload(false)} />
      )}
      {transferFile && (
        <TransferModal file={transferFile} onClose={() => setTransferFile(null)} onSent={() => setTransferFile(null)} />
      )}
    </div>
  )
}
