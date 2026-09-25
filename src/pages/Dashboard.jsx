import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { timeAgo } from '../utils.js'
import UploadModal from '../components/UploadModal.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useAppData } from '../context/AppDataContext.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cases, clients, files, transfers } = useAppData()
  const [showUpload, setShowUpload] = useState(false)

  const activeCases = cases.filter((c) => c.status === 'Activo').length
  const activeFiles = files.filter((f) => !f.trashed)
  const pct = 0

  const actions = [
    { icon: '⚖', label: 'Nuevo expediente', onClick: () => navigate('/expedientes') },
    { icon: '◈', label: 'Nuevo cliente', onClick: () => navigate('/clientes') },
    { icon: '⬆', label: 'Subir archivo', onClick: () => setShowUpload(true) },
    { icon: '📁', label: 'Crear carpeta', onClick: () => navigate('/archivos') },
    { icon: '↗', label: 'Transferir archivo', onClick: () => navigate('/archivos') },
  ]

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Hola, {user?.name?.split(' ')[0] || 'bienvenido'}</h1>
          <div className="sub">Este es el resumen de tu actividad y tus expedientes.</div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">Expedientes activos</div>
          <div className="value">{activeCases}</div>
        </div>
        <div className="stat-card">
          <div className="label">Clientes</div>
          <div className="value">{clients.length}</div>
        </div>
        <div className="stat-card">
          <div className="label">Documentos</div>
          <div className="value">{activeFiles.length}</div>
        </div>
        <div className="stat-card">
          <div className="label">Compartidos conmigo</div>
          <div className="value accent">{transfers.length}</div>
        </div>
      </div>

      <div className="section-title">Acciones rápidas</div>
      <div className="quick-actions">
        {actions.map((a) => (
          <button key={a.label} className="quick-action" onClick={a.onClick}>
            <span className="icon">{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>

      <div className="two-col">
        <div className="card">
          <div className="section-title">Actividad reciente</div>
          {transfers.map((a) => (
            <div key={a.id} className="activity-item">
              <span className="activity-dot" />
              <div className="activity-text">
                <div>
                  <span className="who">Transferencia</span> <strong>{a.fileName}</strong>
                </div>
                <div className="activity-time">{timeAgo(a.sentAt)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-title">Almacenamiento</div>
          <div className="storage-summary">
            <div className="big">0 GB</div>
            <div className="muted">de 0 GB</div>
          </div>
          <div className="storage-bar" style={{ background: 'var(--line)', marginTop: 12 }}>
            <div className="storage-bar-fill" style={{ width: `${pct}%`, background: 'var(--navy)' }} />
          </div>
          <p className="muted mt-16" style={{ fontSize: 12.5, lineHeight: 1.5 }}>
            El límite de almacenamiento varía según el plan de cada usuario. Esta
            arquitectura está preparada para conectarse a un backend con límites
            reales por cuenta.
          </p>
        </div>
      </div>

      {showUpload && (
        <UploadModal cases={cases} onClose={() => setShowUpload(false)} onUploaded={() => setShowUpload(false)} />
      )}
    </div>
  )
}
