import { Box, Skeleton } from '@mui/material';

const AsidePostListSkeleton = () => {
  return (
    <Box>
      {[...Array(3)].map((_, idx) => (
        <Box key={idx} mb={1}>
          <Skeleton variant="text" width="80%" height={28} />
          <Skeleton variant="rectangular" width="100%" height={2} sx={{ my: 0.5 }} />
        </Box>
      ))}
    </Box>
  );
};

export default AsidePostListSkeleton;
