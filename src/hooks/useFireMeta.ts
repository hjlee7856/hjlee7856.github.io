import { getPostsMetas } from '@/utils/postMeta';
import { useEffect, useState } from 'react';

export const useFireMeta = (posts: PostMeta[]) => {
  const [fireMetas, setFireMetas] = useState<FireStorePostMetas>({});

  useEffect(() => {
    const fetchPostMeta = async () => {
      const metas = await getPostsMetas(posts.map((post) => post.slug));
      setFireMetas(metas);
    };
    fetchPostMeta();
  }, []);
  return { fireMetas };
};
