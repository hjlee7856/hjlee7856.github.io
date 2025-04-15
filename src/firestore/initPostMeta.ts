import { db } from '@/firestore/firesbase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const initPostMeta = async (slug: string) => {
  const ref = doc(db, 'posts', slug);
  const snap = await getDoc(ref);

  if (snap.exists()) return;

  // 문서가 없으면 만듬
  await setDoc(ref, {
    slug,
    viewCount: 0,
    likeCount: 0,
    createdAt: new Date(),
  });
};
