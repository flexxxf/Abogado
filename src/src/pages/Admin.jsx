import React, { useState } from 'react'
import { users as initialUsers, activity, transfers, storage, files } from '../data/mockData.js'
import { timeAgo, initials } from '../utils.js'

export default function Admin() {
  const [users, setUsers] = useState(initialUsers)
  const [tab, setTab] = useState('usuarios')
  const pct = Math.round((storage.usedGB / storage.totalGB) * 100)

  function toggleSuspend(id) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, suspended: !u.suspended } : u)))
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Panel de administración</h1>
          <div className="sub">Usuarios, actividad, transferencias y almacenamiento de la firma</div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><div className="label">Usuarios</div><div className="value">{users.length}</div></div>
        <div className="stat-card"><div className="label">Documentos</div><div className="value">{files.filter((f) => !f.trashed).length}</div></div>
        <div className="stat-card"><div className="label">Transferencias</div><div className="value">{transfers.length}</div></div>
        <div className="stat-card"><div className="label">Almacenamiento usado</div><div className="value accent">{pct}%</div></div>
      </div>

      <div className="tabs">
        <div className={`tab${tab === 'usuarios' ? ' active' : ''}`} onClick={() => setTab('usuarios')}>Usuarios</div>
        <div className={`tab${tab === 'actividad' ? ' active' : ''}`} onClick={() => setTab('actividad')}>Actividad</div>
        <div className={`tab${tab === 'almacenamiento' ? ' active' : ''}`} onClick={() => setTab('almacenamiento')}>Almacenamiento</div>
      </div>

      {tab === 'usuarios' && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Usuario</th><th>Rol</th><th>Especialidad</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{initials(u.name)}</div>
                      <div>
                        <div className="row-link">{u.name}</div>
                        <div className="cell-muted" style={{ fontSize: 12 }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="cell-muted">{u.role}</td>
                  <td className="cell-muted">{u.specialty}</td>
                  <td><span className={`badge ${u.suspended ? 'badge-closed' : 'badge-active'}`}>{u.suspended ? 'Suspendido' : 'Activo'}</span></td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => toggleSuspend(u.id)}>
                      {u.suspended ? 'Reactivar' : 'Suspender'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'actividad' && (
        <div className="card">
          {activity.map((a) => {
            const user = users.find((u) => u.id === a.userId)
            return (
              <div key={a.id} className="activity-item">
                <span className="activity-dot" />
                <div className="activity-text">
                  <div><span className="who">{user?.name}</span> {a.action} <strong>{a.target}</strong></div>
                  <div className="activity-time">{timeAgo(a.at)}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'almacenamiento' && (
        <div className="card" style={{ maxWidth: 420 }}>
          <div className="storage-summary">
            <div className="big">{storage.usedGB} GB</div>
            <div className="muted">de {storage.totalGB} GB (plan de la firma)</div>
          </div>
          <div className="storage-bar" style={{ background: 'var(--line)', marginTop: 12 }}>
            <div className="storage-bar-fill" style={{ width: `${pct}%`, background: 'var(--navy)' }} />
          </div>
          <p className="muted mt-16" style={{ fontSize: 12.5, lineHeight: 1.5 }}>
            Los límites por usuario y las alertas de capacidad requieren un
            backend de almacenamiento real (ver README).
          </p>
        </div>
      )}
    </div>
  )
}
