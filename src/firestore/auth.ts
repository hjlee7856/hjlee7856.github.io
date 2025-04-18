// lib/auth.ts
import { auth, db } from '@/firestore/firesbase';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const signInFireAuth = async (providerType: string) => {
  let provider = null;
  if (providerType === 'google') provider = new GoogleAuthProvider();
  if (providerType === 'github') provider = new GithubAuthProvider();
  if (provider === null) return;

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // 회원가입 및 로그인 처리
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    // 이미 가입한 사람이면 무시
    if (userSnap.exists()) return;
    // 미가입 사람이면 계정 생성
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      providerId: user.providerData[0].providerId.replace('.com', ''),
      createdAt: new Date(),
    });
    return user;
  } catch (error) {
    return false;
  }
};

export const logoutWithGoogle = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return false;
  }
};
