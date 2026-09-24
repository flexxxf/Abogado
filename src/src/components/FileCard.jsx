import React, { useState } from 'react'
import { fileIcon, formatSize, formatDate } from '../utils.js'

export default function FileCard({ file, onAction }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function act(action) {
    setMenuOpen(false)
    onAction?.(action, file)
  }

  return (
    <div className="file-card">
      <button className="file-menu-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Más acciones">⋮</button>
      {menuOpen && (
        <div className="notif-panel" style={{ top: 30, right: 4, width: 170 }}>
          <div className="notif-item" onClick={() => act('open')}>Abrir</div>
          <div className="notif-item" onClick={() => act('download')}>Descargar</div>
          <div className="notif-item" onClick={() => act('share')}>Compartir</div>
          <div className="notif-item" onClick={() => act('transfer')}>Transferir</div>
          <div className="notif-item" onClick={() => act('rename')}>Renombrar</div>
          <div className="notif-item" onClick={() => act('delete')} style={{ color: 'var(--danger)' }}>Eliminar</div>
        </div>
      )}
      <div className="file-icon">{fileIcon(file.type)}</div>
      <div className="file-name">{file.name}</div>
      <div className="file-meta">{formatSize(file.size)} · {formatDate(file.updatedAt)}</div>
    </div>
  )
}
