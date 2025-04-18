import { CommentCardList } from '@/components/comment/commentCardList';
import { CommentInput } from '@/components/comment/commentInput';
import LoadingOverlay from '@/components/loadingOverlay';
import { useComment } from '@/hooks/useComment';
import { usePagination } from '@/hooks/usePagenation';
import { Box, Divider, Pagination, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

export type Comment = {
  id: string;
  content: string;
  createdAt: Timestamp;
  uid: string;
  user?: {
    displayName: string;
    email: string;
    photoURL?: string;
    uid: string;
    disabled: boolean;
  };
};

interface Props {
  slug: string;
  postMeta: PostMeta;
}

export default function CommentSection({ slug, postMeta }: Props) {
  // 코멘트 훅
  const { loading, comments } = useComment(slug);
  // 페이지네이션 필터 훅
  const { currentPage, setCurrentPage, totalPages, perPage } = usePagination(comments.length);
  const start = (currentPage - 1) * perPage;

  if (loading) return <LoadingOverlay />;

  return (
    <Box mt={8}>
      {/* 댓글 개수, 문의 */}
      <Divider />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexDirection={'row'}
        alignItems={'center'}
      >
        <Typography variant="subtitle1" fontWeight={'bold'} mb={2} mt={2} gutterBottom>
          댓글 {postMeta.commentCount}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" mb={2} mt={2} gutterBottom>
          댓글 관련 문의: jacker97@naver.com
        </Typography>
      </Box>
      {/* 댓글 입력 */}
      <CommentInput slug={slug} />

      {/* 댓글 리스트 */}
      <CommentCardList slug={slug} comments={comments} start={start} perPage={perPage} />

      {/* 페이지네이션 */}
      {comments.length > 0 && (
        <Box display="flex" justifyContent="center" my={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
