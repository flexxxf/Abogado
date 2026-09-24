import React from 'react'
import { NavLink } from 'react-router-dom'
import { storage } from '../data/mockData.js'

const LINKS = [
  { to: '/', label: 'Inicio', icon: '⌂', end: true },
  { to: '/expedientes', label: 'Expedientes', icon: '⚖' },
  { to: '/clientes', label: 'Clientes', icon: '◈' },
  { to: '/archivos', label: 'Archivos', icon: '⌘' },
  { to: '/compartidos', label: 'Compartidos', icon: '⇄' },
  { to: '/transferencias', label: 'Transferencias', icon: '↗' },
  { to: '/papelera', label: 'Papelera', icon: '⌫' },
  { to: '/configuracion', label: 'Configuración', icon: '⚙' },
]

export default function Sidebar({ open, onClose }) {
  const pct = Math.round((storage.usedGB / storage.totalGB) * 100)

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark">ABOGADO</span>
        </div>
        <div className="sidebar-brand-sub" style={{ padding: '0 10px 14px', marginTop: -10 }}>
          Gestión de expedientes y documentos
        </div>
        <nav className="sidebar-nav">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="sidebar-storage">
            <div className="flex-between">
              <span>Almacenamiento</span>
              <span>{storage.usedGB} GB / {storage.totalGB} GB</span>
            </div>
            <div className="storage-bar">
              <div className="storage-bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
