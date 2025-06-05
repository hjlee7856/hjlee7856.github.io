import { Box, Skeleton } from '@mui/material';

const WorkReportPreviewSkeleton = () => {
  return (
    <Box p={2}>
      <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 2 }} />
      <Box display="flex" gap={2}>
        <Skeleton variant="rectangular" width={80} height={36} />
        <Skeleton variant="rectangular" width={80} height={36} />
      </Box>
    </Box>
  );
};

export default WorkReportPreviewSkeleton;
