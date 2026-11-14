import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase.js';

const userDocument = doc(db, 'users', 'default-user');
const localKey = 'nutriplan-app-data';

export async function loadAppData() {
  try {
    const snapshot = await getDoc(userDocument);
    if (snapshot.exists()) {
      const data = snapshot.data();
      localStorage.setItem(localKey, JSON.stringify(data));
      return data;
    }
  } catch (error) {
    const localData = localStorage.getItem(localKey);
    if (localData) return JSON.parse(localData);
    throw error;
  }
  const localData = localStorage.getItem(localKey);
  return localData ? JSON.parse(localData) : null;
}

export async function saveAppData(data) {
  localStorage.setItem(localKey, JSON.stringify(data));
  await setDoc(userDocument, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
}
