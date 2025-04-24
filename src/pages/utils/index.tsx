import { PageLayout } from '@/components/pageLayout';
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const utilities = [
  {
    title: '금액 한글 변환기',
    description: '금액을 한글로 변환하세요. <br/> 예시) 12,345원: 일만이천삼백사십오 원',
    path: '/utils/local-money-converter',
  },
  {
    title: '업무 보고 생성기',
    description: '업무 보고를 템플릿으로 쉽게 만들어 보세요.',
    path: '/utils/work-report-maker',
  },
  {
    title: '타이틀',
    description: '설명',
    path: '/utils/today-menu-recommender',
  },
];

const UtilPage = () => {
  const router = useRouter();
  return (
    <PageLayout title="유틸리티">
      <Box p={2} width={'100%'}>
        <Grid
          container
          spacing={2}
          width={'100%'}
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          {utilities.map((util) => (
            <Grid key={util.title} flex={1} sx={{ height: '160px' }}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea
                  onClick={() => router.push(util.path)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {util.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {util.description.split('<br/>').map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default UtilPage;
