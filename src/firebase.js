import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCTCQHOSd1tFlGwxWcjMCre18DLTd5xqwg',
  authDomain: 'nutritional-ai-c1ff4.firebaseapp.com',
  projectId: 'nutritional-ai-c1ff4',
  storageBucket: 'nutritional-ai-c1ff4.firebasestorage.app',
  messagingSenderId: '320026184562',
  appId: '1:320026184562:web:749980025231704c57ebeb',
  measurementId: 'G-1ZDJR7REPB',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

if (typeof window !== 'undefined') {
  isSupported().then(supported => { if (supported) getAnalytics(firebaseApp); }).catch(() => {});
}
