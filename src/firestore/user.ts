import { logoutWithFireAuth } from '@/firestore/auth';
import { db } from '@/firestore/firesbase';
import { User } from '@/store/userStore';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const deleteUser = async (user: User) => {
  const ok = window.confirm(
    '정말 회원탈퇴 하시겠습니까? \n작성한 댓글은 가려지며 저장된 정보가 삭제됩니다.'
  );
  if (!ok) return;
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
