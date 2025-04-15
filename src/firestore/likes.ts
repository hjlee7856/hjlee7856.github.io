import { db } from '@/firestore/firesbase';
import { deleteDoc, doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';

/**
 * 좋아요 추가
 */
export const incrementLike = async (slug: string, uid: string) => {
  const likeRef = doc(db, 'users', uid, 'likes', slug);
  const postRef = doc(db, 'posts', slug);
  const likeSnap = await getDoc(likeRef);

  // 이미 좋아요한 상태면 무시
  if (likeSnap.exists()) return;

  // 해당 슬러그 좋아요 생성
  await setDoc(likeRef, {
    createdAt: new Date(),
  });

  // 해당 포스트 좋아요 증가
  await updateDoc(postRef, {
    likeCount: increment(1),
  });
};

/**
 * 좋아요 취소
 */
export const decrementLike = async (slug: string, uid: string) => {
  const likeRef = doc(db, 'users', uid, 'likes', slug);
  const postRef = doc(db, 'posts', slug);
  const likeSnap = await getDoc(likeRef);

  // 좋아요 안 한 상태면 무시
  if (!likeSnap.exists()) return;

  // 해당 슬러그 좋아요 삭제
  await deleteDoc(likeRef);

  // 해당 포스트 좋아요 감소
  await updateDoc(postRef, {
    likeCount: increment(-1),
  });
};

/**
 * 좋아요 여부 확인
 */
export const hasUserLiked = async (slug: string, uid: string): Promise<boolean> => {
  const likeRef = doc(db, 'users', uid, 'likes', slug);
  const snap = await getDoc(likeRef);
  return snap.exists();
};
