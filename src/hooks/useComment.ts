import { Comment } from '@/components/comment/commentSection';
import { addComment, deleteComment, editComment } from '@/firestore/comments';
import { db } from '@/firestore/firesbase';
import useUserStore from '@/store/userStore';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useComment = (slug: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const commentsRef = collection(db, 'posts', slug, 'comments');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [input, setInput] = useState('');
  const { user: currentUser } = useUserStore();

  const handleDelete = async (commentId: string) => {
    const ok = window.confirm('댓글을 삭제하시겠습니까?');
    if (!ok) return;
    deleteComment(slug, commentId);
  };

  const handleEdit = async (commentId: string) => {
    if (!editContent.trim()) return;
    editComment(slug, commentId, editContent);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    if (!currentUser) return;
    addComment(slug, input, currentUser);
    setInput('');
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
    input,
    handleSubmit,
    setInput,
  };
};
