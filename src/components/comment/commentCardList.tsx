import { CommentCard } from '@/components/comment/commentCard';
import { Comment } from '@/components/comment/commentSection';
import { Stack } from '@mui/material';

interface Props {
  slug: string;
  comments: Comment[];
  start: number;
  perPage: number;
}

export const CommentCardList = ({ slug, comments, start, perPage }: Props) => {
  return (
    <Stack spacing={2}>
      {comments.slice(start, start + perPage).map((comment, idx) => {
        return <CommentCard comment={comment} slug={slug} key={idx} />;
      })}
    </Stack>
  );
};
