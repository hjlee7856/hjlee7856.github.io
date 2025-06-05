import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';

const PostListSkeleton = () => {
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {[...Array(5)].map((_, idx) => (
        <Card variant="outlined" key={idx}>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Box flex={1} mr={2}>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={24} />
                <Skeleton variant="rectangular" width="80%" height={20} sx={{ mt: 1, mb: 1 }} />
                <Skeleton variant="text" width="30%" height={20} />
              </Box>
              <Skeleton variant="rectangular" width={120} height={68} sx={{ borderRadius: 2 }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default PostListSkeleton;
