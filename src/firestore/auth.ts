// lib/auth.ts
import { auth, db } from '@/firestore/firesbase';

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const signInFireAuth = async (providerType: string) => {
  let provider = null;
  if (providerType === 'google') provider = new GoogleAuthProvider();
  if (providerType === 'github') provider = new GithubAuthProvider();

  if (!provider) return;

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // 회원가입 및 로그인 처리
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    // 미가입 사람이면 계정 생성
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        providerId: user.providerData[0].providerId.replace('.com', ''),
        createdAt: new Date(),
      });
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const logoutWithFireAuth = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return false;
  }
};

export const updateAuth = async (user: User) => {
  // 저장된 유저정보 갱신
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    await updateDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      providerId: user.providerData[0].providerId.replace('.com', ''),
    });
  }
};
