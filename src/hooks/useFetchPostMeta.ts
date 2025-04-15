import { getPostMeta } from '@/firestore/metas';
import { useEffect, useState } from 'react';

type mdxMeta = {
  title: string;
  date: string;
  category: string;
};

export const useGetPostMeta = (slug: string, meta: mdxMeta) => {
  // 파이어 스토어에 있는 메타 데이터 가져오기
  const [postMetaWithFireStore, setPostMetaWithFireStore] = useState<PostMeta>();

  useEffect(() => {
    const fetchPostMeta = async () => {
      const data: any = await getPostMeta(slug);
      setPostMetaWithFireStore({ ...data, ...meta });
    };
    fetchPostMeta();
  }, [slug]);

  return postMetaWithFireStore;
};
