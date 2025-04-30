import PageLayout from '@/components/util/pageLayout';
import { PageTitle } from '@/components/util/pageTitle';
import { Box, Button, Card, CardContent, LinearProgress, Typography } from '@mui/material';
import { useState } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    weights: {
      meat: number;
      vegetable: number;
      hot: number;
      cold: number;
      spicy: number;
    };
  }[];
}

interface MenuResult {
  name: string;
  weights: {
    meat: number;
    vegetable: number;
    hot: number;
    cold: number;
    spicy: number;
  };
}

const questions: Question[] = [
  {
    id: 1,
    text: '오늘 기분이 어떤가요?',
    options: [
      {
        text: '활기찬 하루를 보내고 싶어요',
        weights: { meat: 0.8, vegetable: 0.2, hot: 0.6, cold: 0.4, spicy: 0.7 },
      },
      {
        text: '평온한 하루를 보내고 싶어요',
        weights: { meat: 0.3, vegetable: 0.7, hot: 0.4, cold: 0.6, spicy: 0.2 },
      },
    ],
  },
  {
    id: 2,
    text: '오늘 날씨는 어떤가요?',
    options: [
      {
        text: '따뜻하고 맑아요',
        weights: { meat: 0.4, vegetable: 0.6, hot: 0.3, cold: 0.7, spicy: 0.2 },
      },
      {
        text: '추워요',
        weights: { meat: 0.7, vegetable: 0.3, hot: 0.8, cold: 0.2, spicy: 0.6 },
      },
    ],
  },
  {
    id: 3,
    text: '오늘 식사 시간은 어떻게 되나요?',
    options: [
      {
        text: '바쁘게 먹어야 해요',
        weights: { meat: 0.6, vegetable: 0.4, hot: 0.5, cold: 0.5, spicy: 0.4 },
      },
      {
        text: '여유롭게 먹을 수 있어요',
        weights: { meat: 0.5, vegetable: 0.5, hot: 0.7, cold: 0.3, spicy: 0.5 },
      },
    ],
  },
  {
    id: 4,
    text: '오늘 운동 계획이 있나요?',
    options: [
      {
        text: '네, 운동할 예정이에요',
        weights: { meat: 0.7, vegetable: 0.3, hot: 0.6, cold: 0.4, spicy: 0.3 },
      },
      {
        text: '아니요, 쉴 예정이에요',
        weights: { meat: 0.4, vegetable: 0.6, hot: 0.4, cold: 0.6, spicy: 0.5 },
      },
    ],
  },
];

const menuResults: MenuResult[] = [
  {
    name: '떡볶이',
    weights: { meat: 0.2, vegetable: 0.3, hot: 0.9, cold: 0.1, spicy: 0.8 },
  },
  {
    name: '피자',
    weights: { meat: 0.8, vegetable: 0.4, hot: 0.7, cold: 0.3, spicy: 0.2 },
  },
  {
    name: '샐러드',
    weights: { meat: 0.1, vegetable: 0.9, hot: 0.2, cold: 0.8, spicy: 0.1 },
  },
  {
    name: '삼겹살',
    weights: { meat: 0.9, vegetable: 0.2, hot: 0.8, cold: 0.2, spicy: 0.3 },
  },
  {
    name: '초밥',
    weights: { meat: 0.6, vegetable: 0.4, hot: 0.3, cold: 0.7, spicy: 0.2 },
  },
  {
    name: '라면',
    weights: { meat: 0.3, vegetable: 0.3, hot: 0.9, cold: 0.1, spicy: 0.7 },
  },
  {
    name: '비빔밥',
    weights: { meat: 0.4, vegetable: 0.7, hot: 0.5, cold: 0.5, spicy: 0.4 },
  },
];

const TITLE = '메뉴 추천기';
const SUB_TITLE = '간단한 문항을 통해 오늘 메뉴를 추천받아 보세요.';

const TodayMenuRecommender = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{
    first: MenuResult;
    second: MenuResult;
    opposite: MenuResult;
    userWeights: { [key: string]: number };
  } | null>(null);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
      setShowResult(true);
    }
  };

  const calculateResult = (answers: { [key: number]: number }) => {
    const totalWeights = { meat: 0, vegetable: 0, hot: 0, cold: 0, spicy: 0 };

    Object.entries(answers).forEach(([questionIndex, optionIndex]) => {
      const question = questions[parseInt(questionIndex)];
      const option = question.options[optionIndex];

      Object.entries(option.weights).forEach(([key, value]) => {
        totalWeights[key as keyof typeof totalWeights] += value;
      });
    });

    const questionCount = questions.length;
    Object.keys(totalWeights).forEach((key) => {
      totalWeights[key as keyof typeof totalWeights] /= questionCount;
    });

    const menuScores = menuResults.map((menu) => {
      let score = 0;
      Object.entries(menu.weights).forEach(([key, value]) => {
        score += Math.abs(value - totalWeights[key as keyof typeof totalWeights]);
      });
      return { menu, score };
    });

    menuScores.sort((a, b) => a.score - b.score);

    const oppositeMenu = menuResults.reduce(
      (opposite, menu) => {
        let score = 0;
        Object.entries(menu.weights).forEach(([key, value]) => {
          score += Math.abs(value - totalWeights[key as keyof typeof totalWeights]);
        });
        return score > opposite.score ? { menu, score } : opposite;
      },
      { menu: menuResults[0], score: 0 }
    );

    setResult({
      first: menuScores[0].menu,
      second: menuScores[1].menu,
      opposite: oppositeMenu.menu,
      userWeights: totalWeights,
    });
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const getRadarData = (weights: { [key: string]: number }) => {
    return [
      { subject: '육류', value: weights.meat * 100 },
      { subject: '채소', value: weights.vegetable * 100 },
      { subject: '따뜻함', value: weights.hot * 100 },
      { subject: '차가움', value: weights.cold * 100 },
      { subject: '매운맛', value: weights.spicy * 100 },
    ];
  };

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
            minHeight: { xs: '400px', sm: '500px' },
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
              <>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={(currentQuestionIndex / questions.length) * 100}
                    sx={{ mb: 2, width: '100%' }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {currentQuestionIndex + 1} / {questions.length}
                  </Typography>
                  <Typography variant="h6" gutterBottom textAlign="center">
                    {questions[currentQuestionIndex].text}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, width: '100%' }}
                  >
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        onClick={() => handleAnswer(index)}
                        sx={{ justifyContent: 'center', textAlign: 'center' }}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    추천 메뉴
                  </Typography>
                  {result && (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        1순위: {result.first.name}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        2순위: {result.second.name}
                      </Typography>

                      <Box sx={{ mt: 2, width: '100%', height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="70%"
                            data={getRadarData(result.userWeights)}
                          >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar
                              name="사용자"
                              dataKey="value"
                              stroke="#8884d8"
                              fill="#8884d8"
                              fillOpacity={0.6}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Button variant="contained" onClick={resetTest} sx={{ mt: 1 }}>
                  다시하기
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </PageLayout>
  );
};

export default TodayMenuRecommender;
