import useCategoryStore from '@/store/categoryStore';
import { useEffect, useState } from 'react';

export const useCategory = (posts?: PostMeta[], categories: string[] = ['전체']) => {
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>([]);
  const { selectCategory, setCategory, selectIdx, setIndex } = useCategoryStore();

  // 카테고리 변경 핸들러
  const changeCategory = (event: React.SyntheticEvent, idx: number) => {
    setIndex(idx);
    setCategory(categories[idx]);
  };

  useEffect(() => {
    if (!posts) return;
    setFilteredPosts(
      posts.filter((post) => selectCategory === categories[0] || post.category === selectCategory)
    );
  }, [posts, selectCategory, categories]);

  return { filteredPosts, changeCategory, selectIdx };
};
