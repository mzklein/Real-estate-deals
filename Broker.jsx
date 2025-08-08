import React,{useState} from 'react'
import { useAuthState } from '../useAuthState.js'
import { createDeal } from '../utils/firestore.js'
export default function Broker(){
  const user=useAuthState()
  const [buyerName,setBuyerName]=useState(''); const [unitNumber,setUnitNumber]=useState('')
  const [depositSchedule,setDepositSchedule]=useState(''); const [notes,setNotes]=useState(''); const [file,setFile]=useState(null); const [msg,setMsg]=useState('')
  const submit=async(e)=>{ e.preventDefault(); setMsg('Submitting…'); try{ await createDeal({buyerName,unitNumber,depositSchedule,notes,file,user}); setMsg('Submitted to Sales Manager.'); setBuyerName('');setUnitNumber('');setDepositSchedule('');setNotes('');setFile(null) }catch(err){ setMsg('Error: '+err.message) } }
  return (<form onSubmit={submit} style={{display:'grid',gap:8}}>
    <h3>Broker · New Deal</h3>
    <input placeholder="Buyer full name" value={buyerName} onChange={e=>setBuyerName(e.target.value)} required />
    <input placeholder="Unit number" value={unitNumber} onChange={e=>setUnitNumber(e.target.value)} required />
    <textarea placeholder="Deposit schedule" value={depositSchedule} onChange={e=>setDepositSchedule(e.target.value)} />
    <textarea placeholder="Notes to manager (optional)" value={notes} onChange={e=>setNotes(e.target.value)} />
    <input type="file" onChange={e=>setFile(e.target.files[0])} />
    <button type="submit">Submit</button>
    {msg && <div>{msg}</div>}
  </form>)}
