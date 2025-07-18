// dataService.js
import { db } from './firebaseConfig.js';
import { doc, setDoc, getDoc } 
  from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

export async function createUserProfile(uid, email) {
  const ref  = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email,
      createdAt: new Date()
    });
  }
}
