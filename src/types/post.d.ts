interface FireStorePostMetas {
  [key: string]: FireStorePostMeta;
}

interface FireStorePostMeta {
  views: number;
  likes: number;
}

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
}
