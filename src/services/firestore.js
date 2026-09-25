import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { firestore } from './firebaseData.js'

function userCollection(userId, name) {
  return collection(firestore, 'users', userId, name)
}

export function subscribeToCollection(userId, name, onChange, onError) {
  return onSnapshot(userCollection(userId, name), (snapshot) => {
    onChange(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
  }, onError)
}

export async function createUserDocument(userId, name, data) {
  const reference = await addDoc(userCollection(userId, name), {
    ...data,
    ownerId: userId,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return { id: reference.id, ...data, ownerId: userId }
}

export function updateUserDocument(userId, name, id, data) {
  return updateDoc(doc(firestore, 'users', userId, name, id), {
    ...data,
    updatedAt: new Date().toISOString(),
  })
}

export function deleteUserDocument(userId, name, id) {
  return deleteDoc(doc(firestore, 'users', userId, name, id))
}
