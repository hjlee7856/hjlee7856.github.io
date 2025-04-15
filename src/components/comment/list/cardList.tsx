import { Comment } from '@/components/comment/comment';
import { CommentCard } from '@/components/comment/list/card';
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
      {comments.slice(start, start + perPage).map((comment) => {
        return <CommentCard comment={comment} slug={slug} />;
      })}
    </Stack>
  );
};
