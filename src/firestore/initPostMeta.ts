import { db } from '@/firestore/firesbase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const initPostMeta = async (posts: PostMeta[]) => {
  posts.forEach(async (post) => {
    const ref = doc(db, 'posts', post.slug);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // 문서가 없으면 만듬
      await setDoc(ref, {
        slug: post.slug,
        title: post.title,
        viewCount: 0,
        likeCount: 0,
        createdAt: new Date(),
      });
    }
  });
};
