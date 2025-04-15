import { useEffect, useState } from 'react';

export const usePagination = (posts: PostMeta[]) => {
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // 페이지당 표시할 포스트 수
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const [currentPosts, setCurrentPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    setCurrentPosts(posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage));
  }, [currentPage, postsPerPage, posts]);

  return { currentPosts, totalPages, currentPage, setCurrentPage };
};
