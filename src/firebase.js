import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAp6JdJdMM4kgfuoX9lLCsA5xsY7GqJad-o",
  authDomain: "upscale-developers.firebaseapp.com",
  projectId: "upscale-developers",
  storageBucket: "upscale-developers.firebasestorage.app",
  messagingSenderId: "88260545848",
  appId: "1:88260545848:web:7ed223a1790b477205e0cd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);