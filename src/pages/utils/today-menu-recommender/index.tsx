import PageLayout from '@/components/util/pageLayout';
import { PageTitle } from '@/components/util/pageTitle';
import { Box, Card, CardContent, Snackbar } from '@mui/material';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import { useMenuRecommender } from './hooks/useMenuRecommender';
import { questions } from './questions';

const TITLE = '메뉴 추천기';
const SUB_TITLE = '간단한 문항을 통해 오늘 메뉴를 추천받아 보세요.';

const TodayMenuRecommender = () => {
  const {
    currentQuestionIndex,
    showResult,
    showAllRankings,
    showToast,
    result,
    handleAnswer,
    resetTest,
    handleShare,
    toggleRankings,
    setShowToast,
  } = useMenuRecommender();

  return (
    <PageLayout>
      <PageTitle title={TITLE} subTitle={SUB_TITLE} />
      <Box
        sx={{
          width: '100%',
          mt: 4,
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            width: { xs: '100%', sm: '400px' },
            minHeight: { xs: '100%', sm: '500px' },
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            {!showResult ? (
              <QuestionCard
                question={questions[currentQuestionIndex]}
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                onAnswer={handleAnswer}
              />
            ) : (
              result && (
                <ResultCard
                  result={result}
                  showAllRankings={showAllRankings}
                  onReset={resetTest}
                  onShare={handleShare}
                  onToggleRankings={toggleRankings}
                />
              )
            )}
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        message="결과가 클립보드에 복사되었습니다!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </PageLayout>
  );
};

export default TodayMenuRecommender;
