import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { users } from '../data/mockData.js'
import { formatDate, statusBadgeClass } from '../utils.js'
import { useAppData } from '../context/AppDataContext.jsx'

const CASE_TYPES = ['Derecho Civil', 'Derecho Corporativo', 'Derecho Laboral', 'Derecho de Familia']

export default function Cases() {
  const navigate = useNavigate()
  const { cases, clients, addCase } = useAppData()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [showNew, setShowNew] = useState(false)

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      const client = clients.find((item) => item.id === c.clientId)
      const matchesQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.number.includes(query) || client?.name.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = !status || c.status === status
      return matchesQuery && matchesStatus
    })
  }, [cases, clients, query, status])

  function handleCreate(newCase) {
    addCase(newCase)
    setShowNew(false)
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Expedientes</h1>
          <div className="sub">{cases.length} expedientes registrados</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNew(true)}>+ Nuevo expediente</button>
      </div>

      <div className="toolbar">
        <input className="text-field" placeholder="Buscar por nombre, número o cliente…" value={query} onChange={(e) => setQuery(e.target.value)} style={{ minWidth: 220, flex: 1, maxWidth: 320 }} />
        <select className="select-field" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos los estados</option>
          <option>Activo</option>
          <option>Pendiente</option>
          <option>Cerrado</option>
          <option>Archivado</option>
        </select>
        <div className="spacer" />
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Expediente</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Abogado</th>
              <th>Actualizado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/expedientes/${c.id}`)}>
                <td>
                  <div className="row-link">#{c.number}</div>
                  <div className="cell-muted">{c.name}</div>
                </td>
                <td>{clients.find((client) => client.id === c.clientId)?.name || '—'}</td>
                <td className="cell-muted">{c.type}</td>
                <td><span className={`badge ${statusBadgeClass(c.status)}`}>{c.status}</span></td>
                <td className="cell-muted">{users.find((user) => user.id === c.lawyerId)?.name || '—'}</td>
                <td className="cell-muted">{formatDate(c.updatedAt)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <span className="icon">⚖</span>
                    <h3>No se encontraron expedientes</h3>
                    <p>Ajusta la búsqueda o crea un nuevo expediente.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showNew && (
        <NewCaseModal onClose={() => setShowNew(false)} onCreate={handleCreate} nextNumber={String(Number(cases[0]?.number || '0') + 1).padStart(6, '0')} />
      )}
    </div>
  )
}

function NewCaseModal({ onClose, onCreate, nextNumber }) {
  const [name, setName] = useState('')
  const { clients } = useAppData()
  const [clientId, setClientId] = useState('')
  const [type, setType] = useState(CASE_TYPES[0])
  const [description, setDescription] = useState('')

  function submit() {
    if (!name.trim()) return
    onCreate({
      id: 'e' + Math.random().toString(36).slice(2, 7),
      number: nextNumber,
      name,
      clientId,
      type,
      status: 'Activo',
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      lawyerId: '',
      description,
      notes: '',
    })
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Nuevo expediente</h3>
          <button className="btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label>Nombre del expediente</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Venta de inmueble — Pérez" />
          </div>
          <div className="field">
            <label>Cliente</label>
            <select className="select-field" value={clientId} onChange={(e) => setClientId(e.target.value)}>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Tipo de caso</label>
            <select className="select-field" value={type} onChange={(e) => setType(e.target.value)}>
              {CASE_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Descripción</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detalles del caso…" />
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit} disabled={!name.trim()}>Crear expediente</button>
        </div>
      </div>
    </div>
  )
}
