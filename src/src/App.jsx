import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Cases from './pages/Cases.jsx'
import CaseDetails from './pages/CaseDetails.jsx'
import Clients from './pages/Clients.jsx'
import Files from './pages/Files.jsx'
import Shared from './pages/Shared.jsx'
import Transfers from './pages/Transfers.jsx'
import Trash from './pages/Trash.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'

function RequireAuth({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="expedientes" element={<Cases />} />
        <Route path="expedientes/:id" element={<CaseDetails />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="archivos" element={<Files />} />
        <Route path="compartidos" element={<Shared />} />
        <Route path="transferencias" element={<Transfers />} />
        <Route path="papelera" element={<Trash />} />
        <Route path="configuracion" element={<Profile />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
