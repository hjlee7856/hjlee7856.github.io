import { db } from '@/firestore/firesbase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export const getPostsMeta = async (posts: PostMeta[]) => {
  // posts 컬렉션에서 슬러그들에 해당하는 메타들을 가져옴
  const meta: any = {};
  const postsMetaRef = collection(db, 'posts');
  const slugs = posts.map((post) => post.slug);
  const q = query(postsMetaRef, where('slug', 'in', slugs));
  try {
    // 가져온 데이터들을 [slug]: {data: ...} 형태로 바꿈
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      meta[doc.id] = doc.data();
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
  // 메타값을 합친 posts를 반환함
  return posts.map((post) => ({
    ...post,
    ...meta[post.slug],
  }));
};

export const getPostMeta = async (slug: string) => {
  // posts 컬렉션에서 슬러그에 해당하는 메타를 가져옴
  const ref = doc(db, 'posts', slug);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return;
  }

  return snap.data();
};
