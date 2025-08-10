import React,{useEffect,useState} from 'react'
import { listDeals, updateOfficeStatus } from '../utils/firestore.js'
export default function Office(){
  const [deals,setDeals]=useState([]); const [loading,setLoading]=useState(true)
  useEffect(()=>{ (async()=>{ const list=await listDeals(); setDeals(list); setLoading(false) })() },[])
  if(loading) return <div>Loading…</div>
  return (<div>
    <h3>Main Office · Tracking</h3>
    {deals.length===0 && <div>No deals found yet.</div>}
    <ul style={{display:'grid',gap:12,padding:0,listStyle:'none'}}>
      {deals.map(d=>(<li key={d.id} style={{border:'1px solid #ddd',borderRadius:8,padding:12}}>
        <div><b>Buyer:</b> {d.buyerName}</div>
        <div><b>Unit:</b> {d.unitNumber}</div>
        <div><b>Status:</b> {d.status||'submitted'}</div>
        <form onSubmit={async(e)=>{ e.preventDefault(); const fd=new FormData(e.currentTarget); await updateOfficeStatus(d.id,{ mortgageApproved: fd.get('mortgageApproved')==='on', closingDate: fd.get('closingDate')||null, depositStatus: fd.get('depositStatus')||'pending' }); alert('Saved') }} style={{display:'grid',gap:6}}>
          <label><input type="checkbox" name="mortgageApproved" defaultChecked={!!d.mortgageApproved}/> Mortgage approved</label>
          <label>Closing date: <input type="date" name="closingDate" defaultValue={d.closingDate||''}/></label>
          <label>Deposit status: <select name="depositStatus" defaultValue={d.depositStatus||'pending'}><option value="pending">Pending</option><option value="cleared">Cleared</option><option value="bounced">Bounced</option></select></label>
          <button type="submit">Save</button>
        </form>
      </li>))}
    </ul>
  </div>)}
