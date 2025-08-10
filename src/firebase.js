import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6JdLM4kgfuoXgILscA5xsY7GqJad-o",
  authDomain: "upscale-developers.firebaseapp.com",
  projectId: "upscale-developers",
  storageBucket: "upscale-developers.appspot.com",
  messagingSenderId: "882608545848",
  appId: "1:882608545848:web:7ed223a1790b477205e0cd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);