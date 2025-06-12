import { ABOUT_TEXT, CONTACT_INFO, CONTACT_TEXT } from '@/constants/about';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Card, CardContent, Typography } from '@mui/material';

<Box display={'flex'} gap={1} alignItems={'center'}>
  <EmailIcon fontSize="small" />
  <Typography variant="body2">jacker97@naver.com</Typography>
</Box>;
export const AboutSection = () => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="body2" color="textSecondary" fontWeight={'bold'} mb={1}>
        소개글
      </Typography>
      {/* 소개글 */}
      <Typography variant="body2" color="text.secondary">
        {ABOUT_TEXT.split('<br/>').map((line: string, index: number) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </Typography>
      {/* 연락처 */}
      <Box mt={2} display={'flex'} flexDirection={'column'} gap={1}>
        <Typography variant="body2" color="textSecondary" fontWeight={'bold'}>
          {CONTACT_TEXT}
        </Typography>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <PersonIcon fontSize="small" color="disabled" />
          <Typography variant="body2">{CONTACT_INFO.name}</Typography>
        </Box>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <WorkIcon fontSize="small" color="disabled" />
          <Typography variant="body2">{CONTACT_INFO.company}</Typography>
        </Box>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <EmailIcon fontSize="small" color="disabled" />
          <Typography variant="body2">{CONTACT_INFO.email}</Typography>
        </Box>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <PhoneAndroidIcon fontSize="small" color="disabled" />
          <Typography variant="body2">{CONTACT_INFO.phone}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);
