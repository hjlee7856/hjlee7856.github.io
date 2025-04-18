import { decrementLike, hasUserLiked, incrementLike } from '@/firestore/likes';
import useUserStore from '@/store/userStore';
import { useEffect, useState } from 'react';

export const useLike = (post: PostMeta) => {
  const [likeActive, setLikeActive] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    const getLike = async () => {
      if (!user?.uid) {
        setLikeActive(false);
        return;
      }
      const liked = await hasUserLiked(post.slug, user.uid);
      setLikeActive(liked);
    };

    getLike();
  }, [user?.uid, post.slug]);

  const handleLike = async () => {
    // 로그인 상태
    if (user?.uid) {
      if (likeActive) {
        // 좋아요 취소
        const likesCount = post.likeCount ?? 0;
        // 좋아요가 0 이상인 경우 감소
        if (likesCount > 0) await decrementLike(post.slug, user.uid);
        setLikeActive(false);
      } else {
        // 좋아요 추가
        await incrementLike(post.slug, user.uid);
        setLikeActive(true);
      }
    } else {
      // 비로그인 상태
      alert('로그인이 필요한 서비스 입니다.');
    }
  };

  return { handleLike, likeActive };
};
