import { db } from '@/firestore/firesbase';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';

/**
 * 조회수 증가
 */
export const incrementView = async (slug: string) => {
  const ref = doc(db, 'posts', slug);
  const snap = await getDoc(ref);

  // 존재하지 않으면 아무것도 하지않음
  if (!snap.exists()) {
    return;
  }
  // 존재하면 뷰 카운트를 올림
  else {
    await updateDoc(ref, {
      viewCount: increment(1),
    });
  }
};
