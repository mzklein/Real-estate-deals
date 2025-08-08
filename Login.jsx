import React,{useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const nav=useNavigate()
  const login=async(e)=>{ e.preventDefault(); setError(''); try{ await signInWithEmailAndPassword(auth,email,password); nav('/') } catch(err){ setError(err.message) } }
  return (<form onSubmit={login} style={{display:'grid',gap:12,maxWidth:360,margin:'32px auto'}}>
    <h3>Login</h3>
    <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
    <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
    {error && <div style={{color:'red'}}>{error}</div>}
    <button type="submit">Login</button>
    <div style={{fontSize:12,opacity:.8}}>Create users in Firebase Auth, then add a Firestore doc at <code>users/UID</code> with fields: role (broker/manager/office) and assignedUnits (array or "all").</div>
  </form>)}
