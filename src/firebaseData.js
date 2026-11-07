import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase.js';

const userDocument = doc(db, 'users', 'default-user');

export async function loadAppData() {
  const snapshot = await getDoc(userDocument);
  return snapshot.exists() ? snapshot.data() : null;
}

export async function saveAppData(data) {
  await setDoc(userDocument, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
}
