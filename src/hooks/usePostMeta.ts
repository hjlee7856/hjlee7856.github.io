import { db } from '@/firestore/firesbase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type MdxMeta = {
  title: string;
  subTitle: string;
  author: string;
  thumbnail: string;
  date: string;
  category: string;
  tags: string;
};

type MeteData = {
  slug: string;
  createdAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

export const usePostMeta = (slug: string, meta: MdxMeta) => {
  const [postMetaFromFireStore, setPostMetaFromFireStore] = useState<PostMeta>();

  useEffect(() => {
    const ref = doc(db, 'posts', slug);

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const metaDataFromFS: MeteData = {
          slug: data.slug,
          createdAt: data.createdAt.toDate(),
          viewCount: data.viewCount,
          likeCount: data.likeCount,
          commentCount: data.commentCount,
        };
        setPostMetaFromFireStore({
          ...meta,
          tags: meta.tags.split(','),
          ...metaDataFromFS,
        });
      }
    });

    return () => unsubscribe(); // 언마운트 시 리스너 정리
  }, [slug]);

  return postMetaFromFireStore;
};
