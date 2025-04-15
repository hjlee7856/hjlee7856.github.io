import { CommentInput } from '@/components/comment/Input';
import { CommentCardList } from '@/components/comment/list/cardList';
import { db } from '@/firestore/firesbase';
import { usePagination } from '@/hooks/usePagenation';
import { Box, CircularProgress, Pagination, Typography } from '@mui/material';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export type Comment = {
  id: string;
  content: string;
  createdAt: Timestamp;
  user: {
    name: string;
    photo?: string;
    uid: string;
  };
};

interface Props {
  slug: string;
}

export default function CommentSection({ slug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // 페이지네이션 필터 훅
  const { currentPage, setCurrentPage, totalPages, perPage } = usePagination(comments.length);
  const start = (currentPage - 1) * perPage;

  const commentsRef = collection(db, 'posts', slug, 'comments');

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

  return (
    <Box>
      {/* 타이틀 */}
      <Typography variant="h5" fontWeight={'bold'} mb={2} mt={2} gutterBottom>
        Comment
      </Typography>

      {/* 댓글 입력 */}
      <CommentInput slug={slug} />

      {/* 댓글 리스트 */}
      {loading ? (
        <CircularProgress />
      ) : (
        <CommentCardList slug={slug} comments={comments} start={start} perPage={perPage} />
      )}

      {/* 페이지네이션 */}
      <Box display="flex" justifyContent="center" my={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
