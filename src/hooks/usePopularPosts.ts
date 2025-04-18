import { db } from '@/firestore/firesbase';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const usePopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState<any[]>([]);

  useEffect(() => {
    const postsRef = collection(db, 'posts');

    // 최다 조회 포스트 5개
    const unsubscribeViews = onSnapshot(
      query(postsRef, orderBy('viewCount', 'desc'), limit(5)),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          console.log(d);
          return {
            ...d,
            createdAt: d.createdAt.toDate(),
          };
        });
        setPopularPosts(data);
      },
      (error) => {
        console.error('Error fetching most viewed posts:', error);
      }
    );

    return () => {
      unsubscribeViews();
    };
  }, []);

  return { popularPosts };
};
