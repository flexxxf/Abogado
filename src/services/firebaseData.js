import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { firebaseApp } from './firebase.js'

export const firestore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

export async function startAnalytics() {
  if (await isSupported()) return getAnalytics(firebaseApp)
  return null
}

export async function uploadUserFile(userId, file, metadata = {}) {
  const fileId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const fileReference = ref(storage, `users/${userId}/files/${fileId}-${file.name}`)
  const uploaded = await uploadBytes(fileReference, file, { contentType: file.type || undefined })
  const url = await getDownloadURL(uploaded.ref)
  return {
    id: fileId,
    name: file.name,
    type: (file.name.split('.').pop() || 'file').toLowerCase(),
    size: file.size,
    url,
    ...metadata,
  }
}