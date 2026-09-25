import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [mode, setMode] = useState('login') // login | register
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  function handleGoogleLogin() {
    setError('')
    setLoading(true)
    loginWithGoogle()
      .then(() => navigate('/'))
      .catch(() => setError('No se pudo iniciar sesión con Google.'))
      .finally(() => setLoading(false))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if ((mode === 'register' && !name.trim()) || !email.trim() || !password) {
      setError('Completa correo y contraseña.')
      return
    }
    setLoading(true)
    try {
      if (mode === 'register') {
        await register(name, email, password)
      } else {
        await login(email, password)
      }
      navigate('/')
    } catch {
      setError('No se pudo iniciar sesión. Verifica tus datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-side">
        <div className="mark">ABOGADO</div>
        <p>
          Una plataforma para almacenar, organizar y transferir los expedientes
          y documentos de tu firma, con el orden que cada caso exige.
        </p>
      </div>
      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <h1>{mode === 'login' ? 'Inicia sesión' : 'Crea tu cuenta'}</h1>
            <div className="sub">
              {mode === 'login' ? 'Accede a tus expedientes y documentos.' : 'Regístrate para empezar a gestionar tus casos.'}
            </div>
          </div>

          {mode === 'register' && (
            <div className="field">
              <label>Nombre completo</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
            </div>
          )}

          <div className="field">
            <label>Correo</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@bufete.com" />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</div>}

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ justifyContent: 'center' }}>
            {loading ? 'Procesando…' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>

          {mode === 'login' && (
            <>
              <div className="auth-divider"><span>o continúa con</span></div>
              <button className="btn btn-google" type="button" onClick={handleGoogleLogin} disabled={loading}>
                <span className="google-mark">G</span>
                Continuar con Google
              </button>
            </>
          )}

          <div className="auth-toggle">
            {mode === 'login' ? (
              <>¿No tienes cuenta? <button type="button" onClick={() => setMode('register')}>Regístrate</button></>
            ) : (
              <>¿Ya tienes cuenta? <button type="button" onClick={() => setMode('login')}>Inicia sesión</button></>
            )}
          </div>

          <div className="muted" style={{ fontSize: 11.5, textAlign: 'center' }}>
            Tu cuenta y tus datos se gestionan de forma segura con Firebase.
          </div>
        </form>
        <div className="app-footer">Desarrollada por César y Encarnación Peña · 829 892 7257</div>
      </div>
    </div>
  )
}
