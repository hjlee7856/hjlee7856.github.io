import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const PrivacyTerms = () => {
  return (
    <Box sx={{ pt: { xs: 4, sm: 8 }, pb: { xs: 1, sm: 4 } }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        개인정보 처리방침
      </Typography>

      <Typography variant="body1" paragraph textAlign={'center'} mb={4}>
        본 웹사이트(이하 "서비스")는 사용자(이하 "회원")의 개인정보를 소중히 여기며, 아래와 같은
        방침에 따라 개인정보를 수집·이용 및 보호합니다.
      </Typography>

      {/* 1. 수집하는 개인정보 항목 */}
      <Typography variant="h6" gutterBottom>
        1. 수집하는 개인정보 항목
      </Typography>
      <List dense>
        <ListItem disablePadding>
          <ListItemText primary="이름, 이메일 주소, 프로필 사진 (Google, GitHub 소셜 로그인 시)" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="서비스 이용기록, 접속 로그, 쿠키, 접속 IP 주소 등" />
        </ListItem>
      </List>

      {/* 2. 개인정보 수집 및 이용 목적 */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        2. 개인정보 수집 및 이용 목적
      </Typography>
      <List dense>
        <ListItem disablePadding>
          <ListItemText primary="회원 식별 및 로그인 기능 제공" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="댓글 작성 등 커뮤니티 기능 제공" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary="서비스 품질 향상 및 통계 분석" />
        </ListItem>
      </List>

      {/* 3. 보유 및 이용 기간 */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        3. 개인정보 보유 및 이용 기간
      </Typography>
      <Typography variant="body1" paragraph>
        회원 탈퇴 시 즉시 삭제되며, 관계 법령에 따라 일정 기간 보존이 필요한 경우 해당 기간 동안
        보관될 수 있습니다.
      </Typography>

      {/* 4. 제3자 제공 및 위탁 */}
      <Typography variant="h6" gutterBottom>
        4. 개인정보의 제3자 제공 및 처리 위탁
      </Typography>
      <Typography variant="body1" paragraph>
        본 서비스는 수집한 개인정보를 제3자에게 제공하거나 외부 업체에 위탁하지 않습니다.
      </Typography>

      {/* 5. 개인정보 보호를 위한 노력 */}
      <Typography variant="h6" gutterBottom>
        5. 개인정보 보호를 위한 조치
      </Typography>
      <Typography variant="body1" paragraph>
        운영자는 개인정보 보호를 위해 보안성 높은 인증 방식을 사용하고 있으며, 비인가 접근을
        방지하기 위해 최선을 다합니다.
      </Typography>

      {/* 적용일자 */}
      <Typography variant="body2" sx={{ mt: 4 }} color="text.secondary">
        본 개인정보 처리방침은 2025년 4월 18일부터 적용됩니다.
      </Typography>
    </Box>
  );
};

export default PrivacyTerms;
