import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { createUserDocument, deleteUserDocument, subscribeToCollection, updateUserDocument } from '../services/firestore.js'

const AppDataContext = createContext(null)
const COLLECTIONS = ['clients', 'cases', 'files', 'transfers']

export function AppDataProvider({ children }) {
  const { user } = useAuth()
  const [data, setData] = useState({ clients: [], cases: [], files: [], transfers: [] })

  useEffect(() => {
    if (!user?.id) {
      setData({ clients: [], cases: [], files: [], transfers: [] })
      return undefined
    }

    const unsubscribers = COLLECTIONS.map((name) => subscribeToCollection(
      user.id,
      name,
      (items) => setData((current) => ({ ...current, [name]: items })),
      (error) => console.error(`No se pudo cargar ${name}:`, error),
    ))

    return () => unsubscribers.forEach((unsubscribe) => unsubscribe())
  }, [user?.id])

  async function addDocument(collectionName, document) {
    if (!user?.id) return null
    return createUserDocument(user.id, collectionName, document)
  }

  function updateDocument(collectionName, id, changes) {
    if (!user?.id) return Promise.resolve()
    return updateUserDocument(user.id, collectionName, id, changes)
  }

  function removeDocument(collectionName, id) {
    if (!user?.id) return Promise.resolve()
    return deleteUserDocument(user.id, collectionName, id)
  }

  return (
    <AppDataContext.Provider value={{
      ...data,
      addClient: (client) => addDocument('clients', client),
      addCase: (item) => addDocument('cases', item),
      addFile: (file) => addDocument('files', file),
      addTransfer: (transfer) => addDocument('transfers', transfer),
      updateFile: (id, changes) => updateDocument('files', id, changes),
      updateTransfer: (id, changes) => updateDocument('transfers', id, changes),
      removeFile: (id) => removeDocument('files', id),
    }}>
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  return useContext(AppDataContext)
}
