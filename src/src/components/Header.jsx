import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import NotificationPanel from './NotificationPanel.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { notifications as mockNotifications } from '../data/mockData.js'
import { initials } from '../utils.js'

export default function Header({ onMenuClick }) {
  const [showNotifs, setShowNotifs] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const unread = mockNotifications.filter((n) => !n.read).length

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenuClick} aria-label="Abrir menú">☰</button>
      <SearchBar />
      <div className="topbar-actions">
        <div style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={() => setShowNotifs((s) => !s)} aria-label="Notificaciones">
            🔔
            {unread > 0 && <span className="notif-dot" />}
          </button>
          {showNotifs && <NotificationPanel notifications={mockNotifications} onClose={() => setShowNotifs(false)} />}
        </div>
        <button className="avatar" onClick={() => navigate('/perfil')} title={user?.name}>
          {user ? initials(user.name) : '—'}
        </button>
      </div>
    </header>
  )
}
