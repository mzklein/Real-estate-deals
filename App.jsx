import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from './firebase.js'
import { doc, getDoc } from 'firebase/firestore'
import Login from './pages/Login.jsx'
import Broker from './pages/Broker.jsx'
import Manager from './pages/Manager.jsx'
import Office from './pages/Office.jsx'
import Dashboard from './pages/Dashboard.jsx'
export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()
  useEffect(() => onAuthStateChanged(auth, async (u) => {
    setUser(u)
    if (u) {
      const snap = await getDoc(doc(db, 'users', u.uid))
      setProfile(snap.exists() ? snap.data() : null)
    } else { setProfile(null); navigate('/login') }
  }), [])
  const logout = async () => { await signOut(auth); navigate('/login') }
  return (<div style={{ maxWidth: 980, margin: '0 auto', padding: 16 }}>
    <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
      <h2>Real Estate Deals</h2>
      {user && <div style={{ display:'flex', gap:12, alignItems:'center' }}>
        <span>{profile?.role?.toUpperCase()} · {user.email}</span>
        <button onClick={logout}>Logout</button>
      </div>}
    </header>
    {profile && <nav style={{ display:'flex', gap:12, marginBottom:16 }}>
      {profile.role==='broker' && <Link to="/broker">Broker</Link>}
      {profile.role==='manager' && <Link to="/manager">Manager</Link>}
      {profile.role==='office' && <Link to="/office">Office</Link>}
      {(profile.role==='manager'||profile.role==='office') && <Link to="/dashboard">Dashboard</Link>}
    </nav>}
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/broker" element={<Require role="broker" profile={profile}><Broker profile={profile}/></Require>} />
      <Route path="/manager" element={<Require role="manager" profile={profile}><Manager/></Require>} />
      <Route path="/office" element={<Require role="office" profile={profile}><Office/></Require>} />
      <Route path="/dashboard" element={<Require anyOf={["manager","office"]} profile={profile}><Dashboard/></Require>} />
      <Route path="*" element={<Login/>} />
    </Routes>
  </div>)}
function Require({ children, role, anyOf, profile }) {
  if (!profile) return <div style={{padding:16}}>Loading…</div>
  if (role && profile.role !== role) return <div style={{padding:16}}>Not authorized.</div>
  if (anyOf && !anyOf.includes(profile.role)) return <div style={{padding:16}}>Not authorized.</div>
  return children
}