import { useState } from 'react';

export const usePagination = (totalLength: number) => {
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5; // 페이지당 표시할 포스트 수
  const totalPages = Math.ceil(totalLength / perPage);

  return { totalPages, currentPage, setCurrentPage, perPage };
};
