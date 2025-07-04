import { db } from '@/firestore/firesbase';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useRecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const postsRef = collection(db, 'posts');

    // 최근 포스트 5개
    const unsubscribeViews = onSnapshot(
      query(postsRef, orderBy('createdAt', 'desc'), limit(3)),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            ...d,
            createdAt: d.createdAt.toDate(),
          };
        });
        setRecentPosts(data);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.error('Error fetching most viewed posts:', error);
      }
    );

    return () => {
      unsubscribeViews();
    };
  }, []);

  return { recentPosts, isLoading };
};
