import { getPostMeta, incrementView } from '@/utils/postMeta';
import { useEffect, useState } from 'react';

export const useFetchPostMeta = (slug: string) => {
  const [fireMeta, setFireMeta] = useState({ views: 0, likes: 0 });

  useEffect(() => {
    const fetchPostMeta = async () => {
      await incrementView(slug);
      const data: any = await getPostMeta(slug);
      setFireMeta(data);
    };
    fetchPostMeta();
  }, [slug]);

  return fireMeta;
};
