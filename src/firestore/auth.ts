// lib/auth.ts
import { auth, db } from '@/firestore/firesbase';

import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const signInFireAuth = async (providerType: string) => {
  let provider = null;
  if (providerType === 'google') provider = new GoogleAuthProvider();
  if (providerType === 'github') provider = new GithubAuthProvider();

  if (!provider) return;

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

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
        disabled: false,
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
