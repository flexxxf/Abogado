import React from 'react'
import { fileIcon, formatSize, formatDate } from '../utils.js'

export default function FileList({ files, owners, onAction }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Tamaño</th>
            <th>Actualizado</th>
            <th>Propietario</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr key={f.id}>
              <td>
                <span style={{ marginRight: 8 }}>{fileIcon(f.type)}</span>
                <span className="row-link" onClick={() => onAction?.('open', f)} style={{ cursor: 'pointer' }}>{f.name}</span>
              </td>
              <td className="cell-muted">{f.type.toUpperCase()}</td>
              <td className="cell-muted">{formatSize(f.size)}</td>
              <td className="cell-muted">{formatDate(f.updatedAt)}</td>
              <td className="cell-muted">{owners?.[f.ownerId] || '—'}</td>
              <td>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                  <button className="btn-ghost btn-sm" onClick={() => onAction?.('download', f)}>Descargar</button>
                  <button className="btn-ghost btn-sm" onClick={() => onAction?.('transfer', f)}>Transferir</button>
                  <button className="btn-ghost btn-sm" onClick={() => onAction?.('delete', f)} style={{ color: 'var(--danger)' }}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
          {files.length === 0 && (
            <tr>
              <td colSpan={6}>
                <div className="empty-state">
                  <span className="icon">📂</span>
                  <h3>No hay archivos aquí</h3>
                  <p>Sube un documento para comenzar.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
