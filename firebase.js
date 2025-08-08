import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAp6lJdMM4kgfuoXgILcsA5xsY7G0Jad-o",
  authDomain: "upscale-developers.firebaseapp.com",
  projectId: "upscale-developers",
  storageBucket: "upscale-developers.firebasestorage.app",
  messagingSenderId: "882600545848",
  appId: "1:882600545848:web:7ed223a1790b477205e0cd"
};
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)