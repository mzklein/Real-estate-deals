import React,{useEffect,useState} from 'react'
import { listDeals } from '../utils/firestore.js'
export default function Dashboard(){
  const [deals,setDeals]=useState([]); const [loading,setLoading]=useState(true)
  useEffect(()=>{ (async()=>{ const list=await listDeals(); setDeals(list); setLoading(false) })() },[])
  if(loading) return <div>Loading…</div>
  return (<div>
    <h3>Deal Dashboard</h3>
    <table border="1" cellPadding="6" style={{borderCollapse:'collapse',width:'100%'}}>
      <thead><tr><th>Buyer</th><th>Unit</th><th>Status</th><th>Mortgage</th><th>Deposit</th><th>Closing Date</th></tr></thead>
      <tbody>{deals.map(d=>(<tr key={d.id}><td>{d.buyerName}</td><td>{d.unitNumber}</td><td>{d.status||'submitted'}</td><td>{d.mortgageApproved?'Approved':'—'}</td><td>{d.depositStatus||'—'}</td><td>{d.closingDate||'—'}</td></tr>))}</tbody>
    </table>
  </div>)}
