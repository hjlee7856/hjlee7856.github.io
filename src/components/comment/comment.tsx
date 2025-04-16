import { CommentCardList } from '@/components/comment/commentCardList';
import { CommentInput } from '@/components/comment/commentInput';
import { useComment } from '@/hooks/useComment';
import { usePagination } from '@/hooks/usePagenation';
import { Box, CircularProgress, Pagination, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

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
  // 코멘트 훅
  const { loading, comments } = useComment(slug);
  // 페이지네이션 필터 훅
  const { currentPage, setCurrentPage, totalPages, perPage } = usePagination(comments.length);
  const start = (currentPage - 1) * perPage;

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
