import { db } from '@/firestore/firesbase';
import { User } from '@/store/userStore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

export const addComment = async (slug: string, input: string, currentUser: User) => {
  const commentsRef = collection(db, 'posts', slug, 'comments');
  await addDoc(commentsRef, {
    content: input,
    createdAt: Timestamp.now(),
    user: currentUser,
  });
  const postRef = doc(db, 'posts', slug);
  await updateDoc(postRef, {
    commentCount: increment(1),
  });
};

export const deleteComment = async (slug: string, commentId: string) => {
  await deleteDoc(doc(db, 'posts', slug, 'comments', commentId));
  const postRef = doc(db, 'posts', slug);
  await updateDoc(postRef, {
    commentCount: increment(-1),
  });
};

export const editComment = async (slug: string, commentId: string, editContent: string) => {
  await updateDoc(doc(db, 'posts', slug, 'comments', commentId), {
    content: editContent,
  });
};
