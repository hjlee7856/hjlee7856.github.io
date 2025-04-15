// lib/firebase.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
};

// 앱 중복 초기화 방지
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// FireStore 인스턴스
export const db = getFirestore(app);

// FireAuth 인스턴스
export const auth = getAuth(app);
