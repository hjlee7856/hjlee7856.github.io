import { categories } from '@/constants/categorys';
import useCategoryStore from '@/store/categoryStore';
import { useEffect, useState } from 'react';

export const useCategory = (posts?: PostMeta[]) => {
  const [filteredPosts, setFillteredPosts] = useState<PostMeta[]>([]);

  const { selectCategory, setCategory, selectIdx, setIndex } = useCategoryStore();

  const changeCategory = (event: React.SyntheticEvent, idx: number) => {
    setIndex(idx);
    setCategory(categories[idx].categoryName);
  };

  useEffect(() => {
    if (!posts) return;
    setFillteredPosts(
      posts.filter((post) => selectCategory === '전체' || post.category === selectCategory)
    );
  }, [posts, selectCategory]);

  return { filteredPosts, changeCategory, selectIdx };
};
