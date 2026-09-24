import React, { createContext, useContext, useState } from 'react'
import * as api from '../services/api.js'
import { users } from '../data/mockData.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(email, password) {
    const res = await api.login(email, password)
    setUser(res.user)
    return res.user
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, allUsers: users }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
