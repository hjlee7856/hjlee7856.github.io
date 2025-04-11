import { getPostMeta } from '@/utils/postMeta';
import { useEffect, useState } from 'react';

export const useFetchPostMeta = (slug: string) => {
  const [fireMeta, setFireMeta] = useState<FireStorePostMeta>();

  useEffect(() => {
    const fetchPostMeta = async () => {
      const data: any = await getPostMeta(slug);
      setFireMeta(data);
    };
    fetchPostMeta();
  }, [slug]);

  return fireMeta;
};
