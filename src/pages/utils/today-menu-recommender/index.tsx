import PageLayout from '@/components/util/pageLayout';
import { PageTitle } from '@/components/util/pageTitle';
import QuestionCard from '@/utils/today-menu-recommender/components/QuestionCard';
import ResultCard from '@/utils/today-menu-recommender/components/ResultCard';
import Toast from '@/components/Toast';
import { useMenuRecommender } from '@/utils/today-menu-recommender/hooks/useMenuRecommender';
import { questions } from '@/utils/today-menu-recommender/questions';
import { Box, Card, CardContent } from '@mui/material';

const TITLE = '메뉴 추천기';
const SUB_TITLE = '간단한 문항을 통해 오늘 메뉴를 추천받아 보세요.';

const TodayMenuRecommender = () => {
  const {
    currentQuestionIndex,
    answers,
    showResult,
    showToast,
    result,
    handleAnswer,
    resetTest,
    handleShare,
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
              result && <ResultCard result={result} onReset={resetTest} onShare={handleShare} />
            )}
          </CardContent>
        </Card>
      </Box>

      <Toast
        open={showToast}
        onClose={() => setShowToast(false)}
        message="결과가 클립보드에 복사되었습니다!"
      />
    </PageLayout>
  );
};

export default TodayMenuRecommender;
