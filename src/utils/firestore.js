import { db, storage } from '../firebase.js'
import { collection, addDoc, serverTimestamp, query, getDocs, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
export async function createDeal({ buyerName, unitNumber, depositSchedule, notes, file, user }){
  let contractURL=null
  if(file){ const r=ref(storage,`contracts/${user.uid}/${Date.now()}-${file.name}`); await uploadBytes(r,file); contractURL=await getDownloadURL(r) }
  const refCol = collection(db,'deals')
  const docRef = await addDoc(refCol,{ buyerName, unitNumber, depositSchedule, notes, contractURL, status:'submitted', createdBy:user.uid, createdAt:serverTimestamp() })
  return docRef.id
}
export async function listDeals(){ const snap=await getDocs(query(collection(db,'deals'))); return snap.docs.map(d=>({ id:d.id, ...d.data() })) }
export async function approveDeal(id){ await updateDoc(doc(db,'deals',id),{ status:'approved_by_manager' }) }
export async function rejectDeal(id){ await updateDoc(doc(db,'deals',id),{ status:'rejected_by_manager' }) }
export async function updateOfficeStatus(id, obj){ await updateDoc(doc(db,'deals',id), obj) }