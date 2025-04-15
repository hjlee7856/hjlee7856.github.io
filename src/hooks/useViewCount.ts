import { incrementView } from '@/firestore/views';
import { useEffect } from 'react';

export const useViewCount = (slug: string) => {
  useEffect(() => {
    incrementView(slug);
  }, [slug]);
};
