import React,{useEffect,useState} from 'react'
import { listDeals, approveDeal, rejectDeal } from '../utils/firestore.js'
export default function Manager(){
  const [deals,setDeals]=useState([]); const [loading,setLoading]=useState(true)
  useEffect(()=>{ (async()=>{ const list=await listDeals(); setDeals(list); setLoading(false) })() },[])
  if(loading) return <div>Loading…</div>
  return (<div>
    <h3>Manager · Review Deals</h3>
    {deals.length===0 && <div>No submissions yet.</div>}
    <ul style={{display:'grid',gap:12,padding:0,listStyle:'none'}}>
      {deals.map(d=>(<li key={d.id} style={{border:'1px solid #ddd',borderRadius:8,padding:12}}>
        <div><b>Buyer:</b> {d.buyerName}</div>
        <div><b>Unit:</b> {d.unitNumber}</div>
        <div><b>Status:</b> {d.status||'submitted'}</div>
        <div><b>Deposit schedule:</b> {d.depositSchedule}</div>
        {d.contractURL && <div><a href={d.contractURL} target="_blank">View contract</a></div>}
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button onClick={async()=>{ await approveDeal(d.id); const list=await listDeals(); setDeals(list) }}>Approve</button>
          <button onClick={async()=>{ await rejectDeal(d.id); const list=await listDeals(); setDeals(list) }}>Reject</button>
        </div>
      </li>))}
    </ul>
  </div>)}
