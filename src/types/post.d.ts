interface FireStorePostMeta {
  [key: string]: { views: number; likes: number };
}

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
}
