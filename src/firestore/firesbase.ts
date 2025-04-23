import { getAnalytics, isSupported } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!, // 🔥 필수
};

// 앱 중복 초기화 방지
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// FireStore 인스턴스
export const db = getFirestore(app);

// FireAuth 인스턴스
export const auth = getAuth(app);

// Google Analytics 인스턴스 (브라우저 환경에서만 실행)
export let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== 'undefined') {
  const initializeAnalytics = async () => {
    if (await isSupported()) {
      analytics = getAnalytics(app);
    }
  };
  initializeAnalytics(); // 비동기 함수 호출
}
