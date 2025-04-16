// usePostMetas.ts
import { db } from '@/firestore/firesbase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const usePostMetaMap = (posts: PostMeta[], currentPage: number, perPage: number = 10) => {
  const [postWithMeta, setPostWithMeta] = useState<PostMeta[]>([]);

  useEffect(() => {
    if (!posts.length) return;

    const postsMetaRef = collection(db, 'posts');

    // 페이지에 맞게 슬라이스
    const start = (currentPage - 1) * perPage;
    const currentPosts = posts.slice(start, start + perPage);
    const slugs = currentPosts.map((post) => post.slug);

    // Firestore where('slug', 'in', [...])은 최대 10개 제한
    const unsubscribe = onSnapshot(query(postsMetaRef, where('slug', 'in', slugs)), (snapshot) => {
      const metaMap: Record<string, any> = {};
      snapshot.forEach((doc) => {
        metaMap[doc.id] = doc.data();
      });

      // slug 기준으로 병합
      const updated = posts.map((post) => ({
        ...post,
        ...metaMap[post.slug],
      }));

      setPostWithMeta(updated);
    });

    return () => unsubscribe();
  }, [posts]);

  return { postWithMeta };
};
