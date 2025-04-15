import { categories } from '@/constants/categorys';
import { useEffect, useState } from 'react';

export const useCategory = (posts: PostMeta[]) => {
  const [filteredPosts, setFillteredPosts] = useState<PostMeta[]>([]);
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);
  const changeCategory = (event: React.SyntheticEvent, idx: number) => {
    setValue(idx);
    setCategory(categories[idx].categoryName);
  };

  useEffect(() => {
    setFillteredPosts(posts.filter((post) => category === '' || post.category === category));
  }, [posts, category]);

  return { filteredPosts, changeCategory, value };
};
