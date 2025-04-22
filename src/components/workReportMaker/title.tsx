import { Box, Typography } from '@mui/material';

export const WorkReportTitle = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">
        업무 보고 생성기
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={0.5}>
        업무 보고를 템플릿으로 자동으로 생성 해줍니다. <br />
        로그인하면 클라우드에 저장됩니다.
      </Typography>
    </Box>
  );
};
