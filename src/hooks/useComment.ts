import { Comment } from '@/components/comment/comment';
import { deleteComment, editComment } from '@/firestore/comments';
import { db } from '@/firestore/firesbase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useComment = (slug: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const commentsRef = collection(db, 'posts', slug, 'comments');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleDelete = async (commentId: string) => {
    const ok = window.confirm('댓글을 삭제하시겠습니까?');
    deleteComment(slug, commentId);
    if (!ok) return;
  };

  const handleEdit = async (commentId: string) => {
    if (!editContent.trim()) return;
    editComment(slug, commentId, editContent);
    setEditingId(null);
  };

  useEffect(() => {
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Comment[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Comment, 'id'>),
      }));
      setComments(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slug]);

  return {
    comments,
    loading,
    editingId,
    editContent,
    setEditContent,
    handleEdit,
    setEditingId,
    handleDelete,
  };
};
