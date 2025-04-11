import { db } from '@/utils/firesbase';
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';

export const getPostMeta = async (slug: string) => {
  const ref = doc(db, 'postsMeta', slug);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      views: 1, // 최초 조회수 1
      likes: 0,
    });
    return { views: 1, likes: 0 };
  }

  return snap.data();
};

export const incrementView = async (slug: string) => {
  const ref = doc(db, 'postsMeta', slug);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      views: 1, // 최초 조회수 1
    });
  } else {
    await updateDoc(ref, {
      views: increment(1),
    });
  }
};

export const incrementLike = async (slug: string) => {
  const ref = doc(db, 'postsMeta', slug);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      likes: 0, // 최초 좋아요 0
    });
  } else {
    await updateDoc(ref, {
      likes: increment(1),
    });
  }
};
