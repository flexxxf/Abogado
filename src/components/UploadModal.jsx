import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { uploadUserFile } from '../services/firebaseData.js'

export default function UploadModal({ cases, defaultCaseId, onClose, onUploaded }) {
  const { user } = useAuth()
  const [dragOver, setDragOver] = useState(false)
  const [caseId, setCaseId] = useState(defaultCaseId || '')
  const [queue, setQueue] = useState([]) // { name, progress, done }

  function handleFiles(fileList) {
    const items = Array.from(fileList).map((file) => ({ id: `${file.name}-${Date.now()}-${Math.random()}`, file, name: file.name, progress: 0, done: false }))
    setQueue((q) => [...q, ...items])
    items.forEach((item) => simulateUpload(item))
  }

  function simulateUpload(item) {
    const tick = () => {
      setQueue((q) =>
        q.map((it) => {
            if (it.id !== item.id || it.done) return it
          const next = Math.min(it.progress + 20 + Math.random() * 15, 100)
          return { ...it, progress: next }
        })
      )
    }
    const interval = setInterval(tick, 220)
    setTimeout(async () => {
      clearInterval(interval)
      const created = await uploadUserFile(user.id, item.file, { caseId, trashed: false })
      setQueue((q) => q.map((it) => (it.id === item.id ? { ...it, progress: 100, done: true } : it)))
      onUploaded?.(created)
    }, 1300)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Subir archivo</h3>
          <button className="btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {cases && (
            <div className="field">
              <label>Expediente (opcional)</label>
              <select className="select-field" value={caseId} onChange={(e) => setCaseId(e.target.value)}>
                <option value="">Sin asignar</option>
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>#{c.number} · {c.name}</option>
                ))}
              </select>
            </div>
          )}
          <div
            className={`dropzone${dragOver ? ' drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              handleFiles(e.dataTransfer.files)
            }}
          >
            Suelta tus archivos aquí, o
            <div className="mt-8">
              <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                Elegir archivos
                <input type="file" multiple style={{ display: 'none' }} onChange={(e) => handleFiles(e.target.files)} />
              </label>
            </div>
          </div>
          {queue.map((item) => (
              <div key={item.id} className="upload-row">
              <span style={{ flexShrink: 0, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>{item.name}</span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${item.progress}%` }} />
              </div>
              <span className="muted" style={{ fontSize: 12, width: 60, textAlign: 'right' }}>
                {item.done ? '✓ Listo' : `${Math.round(item.progress)}%`}
              </span>
            </div>
          ))}
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
