import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'
export function useAuthState(){ const [u,setU]=useState(null); useEffect(()=>onAuthStateChanged(auth,setU),[]); return u }