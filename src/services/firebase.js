import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAs46GSxiX1_J3kqJJ08mFkRfht7w3G_Pk',
  authDomain: 'abogado-32491.firebaseapp.com',
  databaseURL: 'https://abogado-32491-default-rtdb.firebaseio.com',
  projectId: 'abogado-32491',
  storageBucket: 'abogado-32491.firebasestorage.app',
  messagingSenderId: '118079921496',
  appId: '1:118079921496:web:a7385735ecc8ae69ec592d',
  measurementId: 'G-PB5P6R56LG',
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const googleProvider = new GoogleAuthProvider()
