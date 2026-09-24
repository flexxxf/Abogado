// Capa de servicio.
//
// IMPORTANTE: esta es una implementación SIMULADA (mock). Ningún archivo se
// almacena realmente en un servidor; todo vive en memoria durante la sesión
// del navegador. Cada función está escrita con la misma forma (async, con
// latencia simulada) que tendría una llamada real a una API, para que
// conectar un backend real más adelante solo requiera reemplazar el cuerpo
// de estas funciones — no los componentes que las consumen.
//
// Backend sugerido para producción:
//   - Auth: JWT + refresh tokens en cookie httpOnly (no localStorage)
//   - Almacenamiento de archivos: S3 (u equivalente) con URLs firmadas
//   - Base de datos: Postgres (ver esquema en README)
//   - Registro de actividad y permisos aplicados en el servidor, no en el cliente

import * as mock from '../data/mockData.js'

const LATENCY = 220

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY))
}

// ---------- Auth (simulado) ----------
// Real: POST /auth/login, POST /auth/register, cookie de sesión httpOnly.
export async function login(email, _password) {
  const user = mock.users.find((u) => u.email === email) || mock.users[1]
  return delay({ token: 'mock-token', user })
}

export async function getCurrentUser() {
  return delay(mock.users.find((u) => u.id === mock.currentUserId))
}

// ---------- Clientes ----------
export async function listClients() {
  return delay(mock.clients)
}

// ---------- Expedientes ----------
export async function listCases() {
  return delay(mock.cases)
}

export async function getCase(id) {
  return delay(mock.cases.find((c) => c.id === id) || null)
}

// ---------- Archivos ----------
// Real: subir a almacenamiento de objetos vía URL firmada, luego registrar
// metadatos en la base de datos.
export async function listFiles({ caseId } = {}) {
  const items = mock.files.filter((f) => !f.trashed && (!caseId || f.caseId === caseId))
  return delay(items)
}

export async function listTrash() {
  return delay(mock.files.filter((f) => f.trashed))
}

export async function uploadFile(file, { caseId } = {}) {
  // Simulación: no se envía a ningún servidor.
  return delay({
    id: 'f' + Math.random().toString(36).slice(2, 8),
    name: file.name,
    type: (file.name.split('.').pop() || 'file').toLowerCase(),
    size: file.size,
    caseId: caseId || null,
    ownerId: mock.currentUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trashed: false,
  })
}

// ---------- Transferencias ----------
// Real: crear registro de transferencia en el backend + notificación push/email
// al usuario receptor; el archivo permanece en almacenamiento del emisor hasta
// que el receptor decide guardarlo en un expediente.
export async function listTransfers() {
  return delay(mock.transfers)
}

export async function sendTransfer(payload) {
  return delay({ id: 't' + Math.random().toString(36).slice(2, 8), status: 'Pendiente', sentAt: new Date().toISOString(), ...payload })
}

// ---------- Compartidos ----------
export async function listSharedWithMe() {
  return delay(mock.sharedWithMe)
}

export async function listSharedByMe() {
  return delay(mock.sharedByMe)
}

// ---------- Actividad ----------
export async function listActivity() {
  return delay(mock.activity)
}

// ---------- Notificaciones ----------
export async function listNotifications() {
  return delay(mock.notifications)
}

// ---------- Usuarios (admin) ----------
export async function listUsers() {
  return delay(mock.users)
}

// ---------- Almacenamiento ----------
export async function getStorage() {
  return delay(mock.storage)
}
