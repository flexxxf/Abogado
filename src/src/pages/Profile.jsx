import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { initials } from '../utils.js'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('perfil')

  if (!user) return null

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Perfil y configuración</h1>
          <div className="sub">Gestiona tu información y preferencias de la cuenta</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
        <div className="avatar" style={{ width: 56, height: 56, fontSize: 18 }}>{initials(user.name)}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>{user.name}</div>
          <div className="muted" style={{ fontSize: 13 }}>{user.title} · {user.role}</div>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab${tab === 'perfil' ? ' active' : ''}`} onClick={() => setTab('perfil')}>Perfil</div>
        <div className={`tab${tab === 'seguridad' ? ' active' : ''}`} onClick={() => setTab('seguridad')}>Seguridad</div>
        <div className={`tab${tab === 'notificaciones' ? ' active' : ''}`} onClick={() => setTab('notificaciones')}>Notificaciones</div>
      </div>

      {tab === 'perfil' && (
        <div className="card" style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="field"><label>Nombre</label><input defaultValue={user.name} /></div>
          <div className="field"><label>Correo</label><input defaultValue={user.email} /></div>
          <div className="field"><label>Teléfono</label><input defaultValue={user.phone} /></div>
          <div className="field"><label>Cargo</label><input defaultValue={user.title} /></div>
          <div className="field"><label>Especialidad</label><input defaultValue={user.specialty} /></div>
          <div><button className="btn btn-primary">Guardar cambios</button></div>
        </div>
      )}

      {tab === 'seguridad' && (
        <div className="card" style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="field"><label>Contraseña actual</label><input type="password" /></div>
          <div className="field"><label>Nueva contraseña</label><input type="password" /></div>
          <div className="field"><label>Confirmar nueva contraseña</label><input type="password" /></div>
          <div><button className="btn btn-primary">Actualizar contraseña</button></div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '4px 0' }} />
          <div className="flex-between">
            <div>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>Sesiones activas</div>
              <div className="muted" style={{ fontSize: 12.5 }}>Este dispositivo · sesión actual</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      )}

      {tab === 'notificaciones' && (
        <div className="card" style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Archivos recibidos', 'Actualizaciones de expedientes', 'Transferencias aceptadas o rechazadas'].map((label) => (
            <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
              <input type="checkbox" defaultChecked /> {label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
