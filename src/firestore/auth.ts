// lib/auth.ts
import { auth } from '@/firestore/firesbase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('✅ 로그인 성공:', user);
    return user;
  } catch (error) {
    console.error('❌ 로그인 실패:', error);
    throw error;
  }
};

export const logoutWithGoogle = async () => {
  try {
    await signOut(auth);
    console.log('✅ 로그아웃 성공');
  } catch (error: any) {
    console.error('❌ 로그아웃 실패:', error?.code, error?.message, error);
  }
};
