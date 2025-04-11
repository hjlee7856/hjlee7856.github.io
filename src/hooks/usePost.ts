import { decrementLike, incrementLike, incrementView } from '@/utils/postMeta';
import { useEffect, useState } from 'react';

export const usePost = (slug: string, meta?: FireStorePostMeta) => {
  const [likeActive, setLikeActive] = useState(false);

  useEffect(() => {
    // 로컬스토리지에 저장된 값 가져옴
    const liked = localStorage.getItem(`like-${slug}`);
    if (liked === 'true') {
      setLikeActive(true);
    }
    // 조회수 증가
    const handleView = async () => {
      await incrementView(slug);
    };
    handleView();
  }, [slug]);

  const handleLike = async () => {
    if (likeActive) {
      // 좋아요 취소
      const likesCount = meta?.likes ?? 0;
      if (likesCount > 0) await decrementLike(slug);
      localStorage.removeItem(`like-${slug}`);
      setLikeActive(false);
    } else {
      // 좋아요 추가
      await incrementLike(slug);
      localStorage.setItem(`like-${slug}`, 'true');
      setLikeActive(true);
    }
  };

  return { handleLike, likeActive };
};
