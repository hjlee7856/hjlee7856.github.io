import { db } from '@/firestore/firesbase';
import { initPostMeta } from '@/firestore/initPostMeta';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const usePostMetaMap = (posts: PostMeta[], currentPage: number, perPage: number = 10) => {
  const [postWithMeta, setPostWithMeta] = useState<PostMeta[]>([]);

  useEffect(() => {
    if (!posts.length) return;

    initPostMeta(posts);

    const postsMetaRef = collection(db, 'posts');
    const start = (currentPage - 1) * perPage;
    const currentPosts = posts.slice(start, start + perPage);
    const slugs = currentPosts.map((post) => post.slug);

    const q = query(postsMetaRef, where('slug', 'in', slugs));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const metaMap: Record<string, any> = {};
          snapshot.forEach((doc) => {
            metaMap[doc.id] = doc.data();
          });

          const updated = posts
            .map((post) => {
              const meta = metaMap[post.slug];
              return {
                ...post,
                ...meta,
                createdAt: meta?.createdAt?.toDate?.() ?? null,
              };
            })
            .sort((a, b) => {
              const aTime = a.createdAt?.getTime?.() ?? 0;
              const bTime = b.createdAt?.getTime?.() ?? 0;
              return bTime - aTime;
            });

          setPostWithMeta(updated);
        } catch (error) {}
      },
      (error) => {
        // onSnapshot 자체 에러 처리
      }
    );

    return () => unsubscribe();
  }, [posts, currentPage]);

  return { postWithMeta };
};
