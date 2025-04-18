import { Comment } from '@/components/comment/commentSection';
import { useComment } from '@/hooks/useComment';
import useUserStore from '@/store/userStore';
import { Avatar, Box, Button, Card, TextField, Typography } from '@mui/material';

interface Props {
  comment: Comment;
  slug: string;
}

export const CommentCard = ({ comment, slug }: Props) => {
  const { editContent, setEditContent, handleEdit, setEditingId, editingId, handleDelete } =
    useComment(slug);
  const { user: currentUser } = useUserStore();
  const isEditing = editingId === comment.id;

  if (!comment.user) return null;

  const isAuthor = currentUser?.uid === comment.user.uid;
  const createdAt = comment.createdAt.toDate();
  const formattedDate = createdAt.toLocaleString();

  return (
    <Card variant="outlined" key={comment.id} sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Avatar
          src={comment.user.photoURL ?? undefined}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            window.open(`mailto:${comment.user?.email}`);
          }}
        />
        <Typography variant="body1" fontWeight="bold">
          {comment.user.displayName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formattedDate}
        </Typography>
      </Box>

      {isEditing ? (
        <Box display="flex" flexDirection="column" gap={1}>
          <TextField
            multiline
            fullWidth
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <Box display="flex" gap={1} justifyContent={'flex-end'}>
            <Button variant="contained" size="small" onClick={() => handleEdit(comment.id)}>
              저장
            </Button>
            <Button variant="outlined" size="small" onClick={() => setEditingId(null)}>
              취소
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography>{comment.content}</Typography>
      )}

      {isAuthor && !isEditing && (
        <Box display="flex" gap={1} mt={1} justifyContent={'flex-end'}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setEditingId(comment.id);
              setEditContent(comment.content);
            }}
          >
            수정
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDelete(comment.id)}
          >
            삭제
          </Button>
        </Box>
      )}
    </Card>
  );
};
