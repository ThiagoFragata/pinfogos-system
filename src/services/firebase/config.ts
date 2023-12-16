import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBKHz-h5_0-TyYsyoJhTOe4s8l4DY02slQ',
  authDomain: 'sistema-stockflow.firebaseapp.com',
  projectId: 'sistema-stockflow',
  storageBucket: 'sistema-stockflow.appspot.com',
  messagingSenderId: '603812117752',
  appId: '1:603812117752:web:a8b7af99523ca722380f0d',
  measurementId: 'G-2RGWQB8GVS',
}

export const appFirebase = initializeApp(firebaseConfig)
