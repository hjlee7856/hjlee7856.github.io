// lib/firebase.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
};

// 앱 중복 초기화 방지
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore 인스턴스 export
export const db = getFirestore(app);
