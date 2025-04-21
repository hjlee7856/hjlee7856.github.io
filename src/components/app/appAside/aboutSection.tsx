import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Card, CardContent, Typography } from '@mui/material';

<Box display={'flex'} gap={1} alignItems={'center'}>
  <EmailIcon fontSize="small" />
  <Typography variant="body2">jacker97@naver.com</Typography>
</Box>;
export const AboutSection = ({ about }: { about: string }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="body2" color="textSecondary" fontWeight={'bold'} mb={1}>
        소개글
      </Typography>
      {/* 소개글 */}
      <Typography variant="body2" color="text.secondary">
        {about.split('<br/>').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </Typography>
      {/* 연락처 */}
      <Box mt={2} display={'flex'} flexDirection={'column'} gap={1}>
        <Typography variant="body2" color="textSecondary" fontWeight={'bold'}>
          문의
        </Typography>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <PersonIcon fontSize="small" color="disabled" />
          <Typography variant="body2">이형준</Typography>
        </Box>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <WorkIcon fontSize="small" color="disabled" />
          <Typography variant="body2">(주)데일리펀딩, IT팀, 프론트엔드 엔지니어</Typography>
        </Box>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <EmailIcon fontSize="small" color="disabled" />
          <Typography variant="body2">jacker97@naver.com</Typography>
        </Box>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <PhoneAndroidIcon fontSize="small" color="disabled" />
          <Typography variant="body2">010-2281-3080</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);
