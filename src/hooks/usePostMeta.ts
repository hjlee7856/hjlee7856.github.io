import { db } from '@/firestore/firesbase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type mdxMeta = {
  title: string;
  subTitle: string;
  author: string;
  thumbnail: string;
  date: string;
  category: string;
};

export const usePostMeta = (slug: string, meta: mdxMeta) => {
  const [postMetaFromFireStore, setPostMetaFromFireStore] = useState<PostMeta | null>(null);

  useEffect(() => {
    const ref = doc(db, 'posts', slug);

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setPostMetaFromFireStore({
          category: meta.category,
          title: meta.title,
          subTitle: meta.subTitle,
          author: meta.author,
          thumbnail: meta.thumbnail,
          createdAt: data.createdAt,
          slug: data.slug,
          viewCount: data.viewCount,
          likeCount: data.likeCount,
        });
      }
    });

    return () => unsubscribe(); // 언마운트 시 리스너 정리
  }, [slug]);

  return postMetaFromFireStore;
};
