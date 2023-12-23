import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: 'sistema-stockflow.firebaseapp.com',
  projectId: 'sistema-stockflow',
  storageBucket: 'sistema-stockflow.appspot.com',
  messagingSenderId: '603812117752',
  appId: '1:603812117752:web:a8b7af99523ca722380f0d',
  measurementId: 'G-2RGWQB8GVS'
}

export const appFirebase = initializeApp(firebaseConfig)
export const storage = getStorage(appFirebase)
