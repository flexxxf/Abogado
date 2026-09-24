import React, { useState } from 'react'
import { files as allFiles, cases, users } from '../data/mockData.js'
import { fileIcon, formatDate } from '../utils.js'

const caseNameById = Object.fromEntries(cases.map((c) => [c.id, `#${c.number} · ${c.name}`]))
const ownerNameById = Object.fromEntries(users.map((u) => [u.id, u.name]))

export default function Trash() {
  const [trashed, setTrashed] = useState(allFiles.filter((f) => f.trashed))

  function restore(id) {
    setTrashed((prev) => prev.filter((f) => f.id !== id))
  }

  function deleteForever(id) {
    if (confirm('Este archivo se eliminará permanentemente. ¿Continuar?')) {
      setTrashed((prev) => prev.filter((f) => f.id !== id))
    }
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Papelera</h1>
          <div className="sub">Los archivos eliminados se conservan aquí hasta que los elimines definitivamente</div>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Nombre</th><th>Expediente</th><th>Eliminado por</th><th>Fecha</th><th></th></tr>
          </thead>
          <tbody>
            {trashed.map((f) => (
              <tr key={f.id}>
                <td><span style={{ marginRight: 8 }}>{fileIcon(f.type)}</span>{f.name}</td>
                <td className="cell-muted">{caseNameById[f.caseId] || '—'}</td>
                <td className="cell-muted">{ownerNameById[f.ownerId]}</td>
                <td className="cell-muted">{formatDate(f.trashedAt)}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => restore(f.id)}>Restaurar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteForever(f.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {trashed.length === 0 && (
              <tr><td colSpan={5}><div className="empty-state"><span className="icon">⌫</span><h3>La papelera está vacía</h3></div></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
