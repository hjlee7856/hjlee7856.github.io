import { useCategory } from '@/hooks/useCategory';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export const AppLogo = () => {
  const { changeCategory } = useCategory();
  return (
    <Link
      href={`/`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      onClick={(e) => {
        changeCategory(e, 0);
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: '8px 16px',
          borderRadius: 2,
          backgroundColor: 'transparent',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px',
          }}
        >
          CodeDiver
        </Typography>
      </Box>
    </Link>
  );
};
