import React, { createContext, useContext, useState } from 'react'
import { users } from '../data/mockData.js'
import { auth, googleProvider } from '../services/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const user = mapFirebaseUser(result.user)
    setUser(user)
    return user
  }

  async function register(name, email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = { ...mapFirebaseUser(result.user), name }
    setUser(user)
    return user
  }

  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider)
    const user = mapFirebaseUser(result.user)
    setUser(user)
    return user
  }

  function logout() {
    signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, allUsers: users }}>
      {children}
    </AuthContext.Provider>
  )
}

function mapFirebaseUser(firebaseUser) {
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email,
    email: firebaseUser.email,
    role: 'Abogado',
    title: 'Usuario',
    specialty: '—',
    phone: firebaseUser.phoneNumber || '',
    picture: firebaseUser.photoURL || null,
  }
}

export function useAuth() {
  return useContext(AuthContext)
}
