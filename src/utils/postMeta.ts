import { db } from '@/utils/firesbase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

export const getPostsMetas = async (slugs: string[]) => {
  const metas: any = {};

  // postsMeta 컬렉션에서 슬러그에 해당하는 문서들을 가져오는 쿼리 작성
  const postsMetaRef = collection(db, 'postsMeta');
  const q = query(postsMetaRef, where('slug', 'in', slugs)); // 'slug' 필드가 제공된 slugs 목록에 있는 문서들

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      metas[doc.id] = doc.data();
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }

  return metas;
};

export const getPostMeta = async (slug: string) => {
  const ref = doc(db, 'postsMeta', slug);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      views: 1, // 최초 조회수 1
      likes: 0,
      slug: slug, // slug 필드로 지정
    });
    return { views: 1, likes: 0, slug: slug };
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
      likes: 0,
    });
  } else {
    await updateDoc(ref, {
      likes: increment(1),
    });
  }
};

export const decrementLike = async (slug: string) => {
  const ref = doc(db, 'postsMeta', slug);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      views: 0,
    });
  } else {
    await updateDoc(ref, {
      likes: increment(-1),
    });
  }
};
