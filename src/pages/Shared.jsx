import React, { useState } from 'react'
import { sharedWithMe, sharedByMe, users } from '../data/mockData.js'
import { formatDate } from '../utils.js'

const nameById = Object.fromEntries(users.map((u) => [u.id, u.name]))

export default function Shared() {
  const [tab, setTab] = useState('conmigo')

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Compartidos</h1>
          <div className="sub">Archivos que has compartido y que otros han compartido contigo</div>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab${tab === 'conmigo' ? ' active' : ''}`} onClick={() => setTab('conmigo')}>Compartidos conmigo</div>
        <div className={`tab${tab === 'pormi' ? ' active' : ''}`} onClick={() => setTab('pormi')}>Compartidos por mí</div>
      </div>

      {tab === 'conmigo' && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Archivo</th><th>Compartido por</th><th>Fecha</th><th>Permiso</th></tr></thead>
            <tbody>
              {sharedWithMe.map((s) => (
                <tr key={s.id}>
                  <td className="row-link">{s.fileName}</td>
                  <td className="cell-muted">{nameById[s.sharedBy]}</td>
                  <td className="cell-muted">{formatDate(s.sharedAt)}</td>
                  <td className="cell-muted">{s.permission}</td>
                </tr>
              ))}
              {sharedWithMe.length === 0 && (
                <tr><td colSpan={4}><div className="empty-state"><span className="icon">⇄</span><h3>Nada compartido contigo aún</h3></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'pormi' && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Archivo</th><th>Compartido con</th><th>Fecha</th><th>Permiso</th></tr></thead>
            <tbody>
              {sharedByMe.map((s) => (
                <tr key={s.id}>
                  <td className="row-link">{s.fileName}</td>
                  <td className="cell-muted">{nameById[s.sharedWith]}</td>
                  <td className="cell-muted">{formatDate(s.sharedAt)}</td>
                  <td className="cell-muted">{s.permission}</td>
                </tr>
              ))}
              {sharedByMe.length === 0 && (
                <tr><td colSpan={4}><div className="empty-state"><span className="icon">⇄</span><h3>No has compartido archivos</h3></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
