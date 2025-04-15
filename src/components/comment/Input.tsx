import { db } from '@/firestore/firesbase';
import useUserStore from '@/store/userStore';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useState } from 'react';

export const CommentInput = ({ slug }: { slug: string }) => {
  const { user: currentUser } = useUserStore();
  const [input, setInput] = useState('');

  const commentsRef = collection(db, 'posts', slug, 'comments');

  const handleSubmit = async () => {
    if (!input.trim()) return;

    await addDoc(commentsRef, {
      content: input,
      createdAt: Timestamp.now(),
      user: currentUser,
    });

    setInput('');
  };

  return (
    <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
      <Avatar src={currentUser?.photo ?? ''}>{currentUser?.name?.[0] ?? '이'}</Avatar>
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
