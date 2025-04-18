import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const ServiceTerms = () => {
  return (
    <Box sx={{ pt: { xs: 4, sm: 8 }, pb: { xs: 1, sm: 4 } }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        서비스 이용약관
      </Typography>

      <Typography variant="body1" paragraph textAlign={'center'} mb={4}>
        본 이용약관(이하 "약관")은 사용자(이하 "회원")가 본 웹사이트(이하 "서비스")를 이용함에 있어
        회사(또는 개인 개발자, 이하 "운영자")와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로
        합니다.
      </Typography>

      {/* 1. 서비스 목적 */}
      <Typography variant="h6" gutterBottom>
        1. 서비스 목적
      </Typography>
      <Typography variant="body1" paragraph>
        본 서비스는 기술 콘텐츠의 공유 및 커뮤니티 활성화를 위한 목적으로 운영되며, 누구나 자유롭게
        열람 및 의견을 남길 수 있습니다.
      </Typography>

      {/* 2. 회원의 의무 */}
      <Typography variant="h6" gutterBottom>
        2. 회원의 의무
      </Typography>
      <Typography variant="body1" paragraph>
        회원은 다음의 행위를 하여서는 안 됩니다:
      </Typography>
      <List dense>
        <ListItem disablePadding>
          <ListItemText primary="타인의 정보를 도용하거나 허위 정보를 입력하는 행위" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="서비스에 위해를 가하거나 정상적인 운영을 방해하는 행위" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="욕설, 비방, 광고성 댓글 등 커뮤니티 질서를 해치는 행위" />
        </ListItem>
      </List>

      {/* 3. 개인정보 보호 */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        3. 개인정보 보호
      </Typography>
      <Typography variant="body1" paragraph>
        운영자는 관련 법령에 따라 회원의 개인정보를 보호하기 위해 최선을 다하며, 개인정보 수집 및
        이용에 관한 사항은 별도의 개인정보처리방침에 따릅니다.
      </Typography>

      {/* 4. 면책 조항 */}
      <Typography variant="h6" gutterBottom>
        4. 면책 조항
      </Typography>
      <Typography variant="body1" paragraph>
        운영자는 서비스 이용 중 발생하는 데이터 손실, 오류, 회원 간 분쟁 등에 대하여 법적 책임을
        지지 않습니다.
      </Typography>

      {/* 5. 약관 변경 */}
      <Typography variant="h6" gutterBottom>
        5. 약관 변경
      </Typography>
      <Typography variant="body1" paragraph>
        본 약관은 필요 시 사전 고지 없이 변경될 수 있으며, 변경된 약관은 웹사이트에 게시함으로써
        효력을 발생합니다.
      </Typography>

      {/* 적용일자 */}
      <Typography variant="body2" sx={{ mt: 4 }} color="text.secondary">
        본 약관은 2025년 4월 18일부터 적용됩니다.
      </Typography>
    </Box>
  );
};

export default ServiceTerms;
