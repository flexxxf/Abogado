import React, { useState } from 'react'
import * as api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useAppData } from '../context/AppDataContext.jsx'

export default function TransferModal({ file, onClose, onSent }) {
  const { user, allUsers } = useAuth()
  const { addTransfer } = useAppData()
  const [toId, setToId] = useState('')
  const [message, setMessage] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [allowDownload, setAllowDownload] = useState(true)
  const [sending, setSending] = useState(false)

  const recipients = allUsers.filter((u) => u.id !== user?.id)

  async function handleSend() {
    if (!toId) return
    setSending(true)
    const t = await api.sendTransfer({
      fileId: file.id,
      fileName: file.name,
      size: file.size,
      fromId: user.id,
      toId,
      message,
      expiresAt: expiresAt || null,
      allowDownload,
    })
    addTransfer(t)
    setSending(false)
    onSent?.(t)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Transferir archivo</h3>
          <button className="btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label>Archivo</label>
            <input value={file.name} disabled />
          </div>
          <div className="field">
            <label>Enviar a</label>
            <select className="select-field" value={toId} onChange={(e) => setToId(e.target.value)}>
              <option value="">Selecciona un usuario</option>
              {recipients.map((r) => (
                <option key={r.id} value={r.id}>{r.name} — {r.title}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Mensaje (opcional)</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Añade contexto para el destinatario…" />
          </div>
          <div className="field">
            <label>Fecha de expiración (opcional)</label>
            <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5 }}>
            <input type="checkbox" checked={allowDownload} onChange={(e) => setAllowDownload(e.target.checked)} />
            Permitir descarga
          </label>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" disabled={!toId || sending} onClick={handleSend}>
            {sending ? 'Enviando…' : 'Transferir'}
          </button>
        </div>
      </div>
    </div>
  )
}
