import 'dotenv/config'
import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import { OAuth2Client } from 'google-auth-library'

const app = express()
const port = Number(process.env.PORT || 3000)
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
const googleClientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID
const googleClient = new OAuth2Client(googleClientId)
const sessions = new Map()

if (!googleClientId) {
  console.warn('GOOGLE_CLIENT_ID no está configurado; /api/auth/google no podrá validar credenciales.')
}

app.use(cors({ origin: clientOrigin, credentials: true }))
app.use(express.json({ limit: '32kb' }))

function setSessionCookie(response, token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  response.setHeader('Set-Cookie', `abogado_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${secure}`)
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'abogado-api' })
})

app.post('/api/auth/google', async (request, response) => {
  const { credential } = request.body || {}
  if (!credential || !googleClientId) {
    return response.status(400).json({ error: 'Google OAuth no está configurado correctamente' })
  }

  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: googleClientId })
    const payload = ticket.getPayload()
    if (!payload?.sub || !payload.email || payload.email_verified !== true) {
      return response.status(401).json({ error: 'La cuenta de Google no pudo ser verificada' })
    }

    const user = {
      id: `google_${payload.sub}`,
      name: payload.name || payload.email,
      email: payload.email,
      role: 'Abogado',
      title: 'Usuario Google',
      specialty: '—',
      phone: '',
      picture: payload.picture || null,
    }
    const sessionToken = crypto.randomBytes(32).toString('hex')
    sessions.set(sessionToken, { user, expiresAt: Date.now() + 604800000 })
    setSessionCookie(response, sessionToken)
    return response.json({ user })
  } catch (error) {
    console.error('Google OAuth validation failed:', error.message)
    return response.status(401).json({ error: 'Credencial de Google inválida' })
  }
})

app.post('/api/auth/logout', (request, response) => {
  const cookie = request.headers.cookie || ''
  const token = cookie.match(/(?:^|; )abogado_session=([^;]+)/)?.[1]
  if (token) sessions.delete(token)
  response.setHeader('Set-Cookie', 'abogado_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0')
  response.status(204).end()
})

app.listen(port, () => {
  console.log(`Abogado API escuchando en http://localhost:${port}`)
})
