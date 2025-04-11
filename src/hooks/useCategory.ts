import { categories } from '@/constants/category';
import { useState } from 'react';

export const useCategory = (posts: PostMeta[]) => {
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);
  const changeCategory = (event: React.SyntheticEvent, idx: number) => {
    setValue(idx);
    setCategory(categories[idx].categoryName);
  };

  const filteredPosts = posts.filter((post) => category === '' || post.category === category);

  return { filteredPosts, changeCategory, value };
};
