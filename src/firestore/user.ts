import { logoutWithFireAuth } from '@/firestore/auth';
import { db } from '@/firestore/firesbase';
import { User } from '@/store/userStore';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const deleteUser = async (user: User) => {
  // 저장된 유저정보 갱신
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    await updateDoc(userRef, {
      disabled: true,
    });
    logoutWithFireAuth();
  }
};
