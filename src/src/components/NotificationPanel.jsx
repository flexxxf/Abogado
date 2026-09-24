import React from 'react'
import { timeAgo } from '../utils.js'

export default function NotificationPanel({ notifications, onClose }) {
  return (
    <div className="notif-panel">
      <div className="notif-panel-head flex-between">
        <span>Notificaciones</span>
        <button className="btn-ghost btn-sm" onClick={onClose}>Cerrar</button>
      </div>
      {notifications.length === 0 && <div className="notif-item muted">No tienes notificaciones.</div>}
      {notifications.map((n) => (
        <div key={n.id} className="notif-item" style={{ fontWeight: n.read ? 400 : 600 }}>
          {n.text}
          <div className="time">{timeAgo(n.at)}</div>
        </div>
      ))}
    </div>
  )
}
