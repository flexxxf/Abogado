import React, { useMemo, useState } from 'react'
import { formatDate } from '../utils.js'
import { useAppData } from '../context/AppDataContext.jsx'

export default function Clients() {
  const { clients, cases, addClient } = useAppData()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [showNew, setShowNew] = useState(false)

  const filtered = useMemo(
    () => clients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.document.includes(query)),
    [clients, query]
  )

  function handleCreate(client) {
    addClient(client)
    setShowNew(false)
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Clientes</h1>
          <div className="sub">{clients.length} clientes registrados</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNew(true)}>+ Nuevo cliente</button>
      </div>

      <div className="toolbar">
        <input className="text-field" placeholder="Buscar por nombre o documento…" value={query} onChange={(e) => setQuery(e.target.value)} style={{ minWidth: 220, flex: 1, maxWidth: 320 }} />
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Expedientes</th>
              <th>Registrado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
                <td className="row-link">{c.name}</td>
                <td className="cell-muted">{c.document}</td>
                <td className="cell-muted">{c.phone}</td>
                <td className="cell-muted">{c.caseIds.length}</td>
                <td className="cell-muted">{formatDate(c.registeredAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{selected.name}</h3>
              <button className="btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="field"><label>Documento</label><input value={selected.document} disabled /></div>
              <div className="field"><label>Teléfono</label><input value={selected.phone} disabled /></div>
              <div className="field"><label>Correo</label><input value={selected.email} disabled /></div>
              <div className="field"><label>Dirección</label><input value={selected.address} disabled /></div>
              {selected.notes && <div className="field"><label>Notas</label><textarea value={selected.notes} disabled /></div>}
              <div className="field">
                <label>Expedientes asociados</label>
                {cases.filter((c) => selected.caseIds.includes(c.id)).map((c) => (
                  <div key={c.id} className="cell-muted" style={{ fontSize: 13.5 }}>#{c.number} · {c.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showNew && <NewClientModal onClose={() => setShowNew(false)} onCreate={handleCreate} />}
    </div>
  )
}

function NewClientModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ name: '', document: '', phone: '', email: '', address: '', notes: '' })

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function submit() {
    if (!form.name.trim()) return
    onCreate({ id: 'c' + Math.random().toString(36).slice(2, 7), ...form, registeredAt: new Date().toISOString().slice(0, 10), caseIds: [] })
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Nuevo cliente</h3>
          <button className="btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field"><label>Nombre completo</label><input value={form.name} onChange={(e) => set('name', e.target.value)} /></div>
          <div className="field"><label>Documento de identidad</label><input value={form.document} onChange={(e) => set('document', e.target.value)} /></div>
          <div className="field"><label>Teléfono</label><input value={form.phone} onChange={(e) => set('phone', e.target.value)} /></div>
          <div className="field"><label>Correo</label><input value={form.email} onChange={(e) => set('email', e.target.value)} /></div>
          <div className="field"><label>Dirección</label><input value={form.address} onChange={(e) => set('address', e.target.value)} /></div>
          <div className="field"><label>Notas</label><textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} /></div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit} disabled={!form.name.trim()}>Guardar cliente</button>
        </div>
      </div>
    </div>
  )
}
