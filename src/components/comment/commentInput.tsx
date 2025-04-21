import { useComment } from '@/hooks/useComment';
import useUserStore from '@/store/userStore';
import { Avatar, Box, Button, TextField } from '@mui/material';

export const CommentInput = ({ slug }: { slug: string }) => {
  const { user: currentUser } = useUserStore();
  const { input, setInput, handleSubmit } = useComment(slug);
  return (
    <Box display="flex" gap={2} mb={2} alignItems="center" justifyContent="center">
      <Avatar src={currentUser?.photoURL ?? ''} alt={currentUser?.displayName ?? ''} />
      <TextField
        fullWidth
        multiline
        placeholder={currentUser ? '댓글을 입력하세요...' : '댓글을 작성하려면 로그인 하세요.'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="small"
        disabled={!currentUser}
      />
      <Button variant="contained" onClick={handleSubmit} disabled={!input.trim() || !currentUser}>
        작성
      </Button>
    </Box>
  );
};
