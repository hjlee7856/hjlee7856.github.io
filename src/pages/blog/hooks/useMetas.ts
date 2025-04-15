import { getPostsMeta } from '@/firestore/metas';
import { useState } from 'react';

export const usePostMetas = (posts: PostMeta[]) => {
  const [postWithMeta, setPostWithMeta] = useState<PostMeta[]>([]);

  const fetchPostMeta = async () => {
    const getPostWithMeta = await getPostsMeta(posts);
    setPostWithMeta(getPostWithMeta);
  };

  return { postWithMeta, fetchPostMeta };
};
