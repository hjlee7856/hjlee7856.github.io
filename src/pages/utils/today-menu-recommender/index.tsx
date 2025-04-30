import PageLayout from '@/components/util/pageLayout';
import { PageTitle } from '@/components/util/pageTitle';
import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Snackbar,
  Typography,
} from '@mui/material';
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
      temperature: number;
      spicy: number;
      sweet: number;
      salty: number;
      sour: number;
      oily: number;
    };
  }[];
}

interface MenuResult {
  name: string;
  weights: {
    meat: number;
    vegetable: number;
    temperature: number;
    spicy: number;
    sweet: number;
    salty: number;
    sour: number;
    oily: number;
  };
}

const questions: Question[] = [
  {
    id: 1,
    text: '오늘 기분이 어떤가요?',
    options: [
      {
        text: '활기찬 하루를 보내고 싶어요',
        weights: {
          meat: 0.8,
          vegetable: 0.2,
          temperature: 0.7,
          spicy: 0.7,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.3,
          oily: 0.6,
        },
      },
      {
        text: '평온한 하루를 보내고 싶어요',
        weights: {
          meat: 0.3,
          vegetable: 0.7,
          temperature: 0.4,
          spicy: 0.2,
          sweet: 0.5,
          salty: 0.3,
          sour: 0.4,
          oily: 0.3,
        },
      },
    ],
  },
  {
    id: 2,
    text: '오늘 날씨는 어떤가요?',
    options: [
      {
        text: '따뜻하고 맑아요',
        weights: {
          meat: 0.4,
          vegetable: 0.6,
          temperature: 0.3,
          spicy: 0.2,
          sweet: 0.4,
          salty: 0.3,
          sour: 0.5,
          oily: 0.3,
        },
      },
      {
        text: '추워요',
        weights: {
          meat: 0.7,
          vegetable: 0.3,
          temperature: 0.8,
          spicy: 0.6,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.2,
          oily: 0.6,
        },
      },
    ],
  },
  {
    id: 3,
    text: '오늘 식사 시간은 어떻게 되나요?',
    options: [
      {
        text: '바쁘게 먹어야 해요',
        weights: {
          meat: 0.6,
          vegetable: 0.4,
          temperature: 0.5,
          spicy: 0.4,
          sweet: 0.3,
          salty: 0.4,
          sour: 0.3,
          oily: 0.5,
        },
      },
      {
        text: '여유롭게 먹을 수 있어요',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.7,
          spicy: 0.5,
          sweet: 0.4,
          salty: 0.5,
          sour: 0.4,
          oily: 0.4,
        },
      },
    ],
  },
  {
    id: 4,
    text: '오늘 운동 계획이 있나요?',
    options: [
      {
        text: '네, 운동할 예정이에요',
        weights: {
          meat: 0.7,
          vegetable: 0.3,
          temperature: 0.6,
          spicy: 0.3,
          sweet: 0.2,
          salty: 0.4,
          sour: 0.3,
          oily: 0.5,
        },
      },
      {
        text: '아니요, 쉴 예정이에요',
        weights: {
          meat: 0.4,
          vegetable: 0.6,
          temperature: 0.4,
          spicy: 0.5,
          sweet: 0.6,
          salty: 0.3,
          sour: 0.5,
          oily: 0.3,
        },
      },
    ],
  },
  {
    id: 5,
    text: '오늘 식사는 몇 명이서 하시나요?',
    options: [
      {
        text: '혼자 먹어요',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.5,
          spicy: 0.4,
          sweet: 0.4,
          salty: 0.4,
          sour: 0.4,
          oily: 0.4,
        },
      },
      {
        text: '여러 명이서 먹어요',
        weights: {
          meat: 0.7,
          vegetable: 0.6,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.5,
          salty: 0.5,
          sour: 0.5,
          oily: 0.6,
        },
      },
    ],
  },
  {
    id: 6,
    text: '오늘 식사 예산은 어떻게 되나요?',
    options: [
      {
        text: '저렴하게 먹고 싶어요',
        weights: {
          meat: 0.4,
          vegetable: 0.6,
          temperature: 0.5,
          spicy: 0.4,
          sweet: 0.3,
          salty: 0.4,
          sour: 0.4,
          oily: 0.3,
        },
      },
      {
        text: '좀 더 비싸도 괜찮아요',
        weights: {
          meat: 0.7,
          vegetable: 0.5,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.5,
          salty: 0.5,
          sour: 0.5,
          oily: 0.6,
        },
      },
    ],
  },
  {
    id: 7,
    text: '오늘 식사는 어떤 시간대에 하시나요?',
    options: [
      {
        text: '아침이나 점심이에요',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.5,
          spicy: 0.3,
          sweet: 0.4,
          salty: 0.4,
          sour: 0.3,
          oily: 0.4,
        },
      },
      {
        text: '저녁이에요',
        weights: {
          meat: 0.6,
          vegetable: 0.4,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.4,
          oily: 0.5,
        },
      },
    ],
  },
  {
    id: 8,
    text: '오늘 식사는 어떤 장소에서 하시나요?',
    options: [
      {
        text: '집에서 먹어요',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.5,
          spicy: 0.4,
          sweet: 0.4,
          salty: 0.4,
          sour: 0.4,
          oily: 0.4,
        },
      },
      {
        text: '외식할 거예요',
        weights: {
          meat: 0.6,
          vegetable: 0.4,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.3,
          oily: 0.5,
        },
      },
    ],
  },
  {
    id: 9,
    text: '오늘 식사는 어떤 분위기로 하고 싶으신가요?',
    options: [
      {
        text: '가볍고 간단하게',
        weights: {
          meat: 0.4,
          vegetable: 0.6,
          temperature: 0.4,
          spicy: 0.3,
          sweet: 0.4,
          salty: 0.3,
          sour: 0.4,
          oily: 0.3,
        },
      },
      {
        text: '푸짐하고 든든하게',
        weights: {
          meat: 0.7,
          vegetable: 0.5,
          temperature: 0.7,
          spicy: 0.5,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.3,
          oily: 0.6,
        },
      },
    ],
  },
  {
    id: 10,
    text: '오늘 식사는 어떤 맛을 선호하시나요?',
    options: [
      {
        text: '담백하고 깔끔한 맛',
        weights: {
          meat: 0.4,
          vegetable: 0.6,
          temperature: 0.5,
          spicy: 0.2,
          sweet: 0.3,
          salty: 0.3,
          sour: 0.3,
          oily: 0.3,
        },
      },
      {
        text: '진하고 풍부한 맛',
        weights: {
          meat: 0.7,
          vegetable: 0.4,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.4,
          salty: 0.6,
          sour: 0.4,
          oily: 0.7,
        },
      },
    ],
  },
  {
    id: 11,
    text: '오늘 식사는 어떤 식사량을 원하시나요?',
    options: [
      {
        text: '적당한 양',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.5,
          spicy: 0.4,
          sweet: 0.4,
          salty: 0.4,
          sour: 0.4,
          oily: 0.4,
        },
      },
      {
        text: '푸짐한 양',
        weights: {
          meat: 0.7,
          vegetable: 0.6,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.4,
          salty: 0.5,
          sour: 0.4,
          oily: 0.6,
        },
      },
    ],
  },
  {
    id: 12,
    text: '오늘 식사는 어떤 식사 스타일을 선호하시나요?',
    options: [
      {
        text: '한식',
        weights: {
          meat: 0.5,
          vegetable: 0.6,
          temperature: 0.6,
          spicy: 0.4,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.4,
          oily: 0.4,
        },
      },
      {
        text: '양식/일식/중식',
        weights: {
          meat: 0.6,
          vegetable: 0.4,
          temperature: 0.5,
          spicy: 0.3,
          sweet: 0.4,
          salty: 0.4,
          sour: 0.3,
          oily: 0.5,
        },
      },
    ],
  },
];

const menuResults: MenuResult[] = [
  {
    name: '떡볶이',
    weights: {
      meat: 0.2,
      vegetable: 0.3,
      temperature: 0.9,
      spicy: 0.8,
      sweet: 0.7,
      salty: 0.6,
      sour: 0.2,
      oily: 0.4,
    },
  },
  {
    name: '피자',
    weights: {
      meat: 0.8,
      vegetable: 0.4,
      temperature: 0.7,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.1,
      oily: 0.8,
    },
  },
  {
    name: '샐러드',
    weights: {
      meat: 0.1,
      vegetable: 0.9,
      temperature: 0.2,
      spicy: 0.1,
      sweet: 0.2,
      salty: 0.2,
      sour: 0.3,
      oily: 0.1,
    },
  },
  {
    name: '고등어구이',
    weights: {
      meat: 0.8,
      vegetable: 0.3,
      temperature: 0.7,
      spicy: 0.3,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.2,
      oily: 0.7,
    },
  },
  {
    name: '돈까스',
    weights: {
      meat: 0.9,
      vegetable: 0.3,
      temperature: 0.6,
      spicy: 0.2,
      sweet: 0.2,
      salty: 0.4,
      sour: 0.1,
      oily: 0.8,
    },
  },
  {
    name: '냉모밀',
    weights: {
      meat: 0.2,
      vegetable: 0.4,
      temperature: 0.2,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.4,
      sour: 0.3,
      oily: 0.2,
    },
  },
  {
    name: '짜장면',
    weights: {
      meat: 0.5,
      vegetable: 0.5,
      temperature: 0.7,
      spicy: 0.1,
      sweet: 0.4,
      salty: 0.6,
      sour: 0.1,
      oily: 0.7,
    },
  },
  {
    name: '짬뽕',
    weights: {
      meat: 0.6,
      vegetable: 0.6,
      temperature: 0.9,
      spicy: 0.7,
      sweet: 0.2,
      salty: 0.7,
      sour: 0.2,
      oily: 0.6,
    },
  },
  {
    name: '볶음밥',
    weights: {
      meat: 0.6,
      vegetable: 0.5,
      temperature: 0.7,
      spicy: 0.3,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.2,
      oily: 0.6,
    },
  },
  {
    name: '샌드위치',
    weights: {
      meat: 0.5,
      vegetable: 0.6,
      temperature: 0.3,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.4,
      sour: 0.2,
      oily: 0.3,
    },
  },
  {
    name: '햄버거',
    weights: {
      meat: 0.8,
      vegetable: 0.4,
      temperature: 0.6,
      spicy: 0.3,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.2,
      oily: 0.7,
    },
  },
  {
    name: '라멘',
    weights: {
      meat: 0.6,
      vegetable: 0.4,
      temperature: 0.9,
      spicy: 0.5,
      sweet: 0.2,
      salty: 0.7,
      sour: 0.2,
      oily: 0.6,
    },
  },
  {
    name: '텐동',
    weights: {
      meat: 0.7,
      vegetable: 0.4,
      temperature: 0.7,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.2,
      oily: 0.8,
    },
  },
  {
    name: '우동',
    weights: {
      meat: 0.3,
      vegetable: 0.4,
      temperature: 0.9,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.2,
      oily: 0.4,
    },
  },
  {
    name: '국수',
    weights: {
      meat: 0.3,
      vegetable: 0.5,
      temperature: 0.8,
      spicy: 0.3,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.3,
      oily: 0.3,
    },
  },
  {
    name: '김밥',
    weights: {
      meat: 0.4,
      vegetable: 0.5,
      temperature: 0.3,
      spicy: 0.2,
      sweet: 0.2,
      salty: 0.4,
      sour: 0.2,
      oily: 0.3,
    },
  },
  {
    name: '국밥',
    weights: {
      meat: 0.7,
      vegetable: 0.5,
      temperature: 0.9,
      spicy: 0.3,
      sweet: 0.2,
      salty: 0.6,
      sour: 0.2,
      oily: 0.5,
    },
  },
  {
    name: '초밥',
    weights: {
      meat: 0.6,
      vegetable: 0.4,
      temperature: 0.3,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.4,
      sour: 0.3,
      oily: 0.3,
    },
  },
  {
    name: '라면',
    weights: {
      meat: 0.3,
      vegetable: 0.3,
      temperature: 0.9,
      spicy: 0.7,
      sweet: 0.2,
      salty: 0.8,
      sour: 0.1,
      oily: 0.5,
    },
  },
  {
    name: '비빔밥',
    weights: {
      meat: 0.4,
      vegetable: 0.7,
      temperature: 0.5,
      spicy: 0.4,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.4,
      oily: 0.3,
    },
  },
  {
    name: '치킨',
    weights: {
      meat: 0.8,
      vegetable: 0.2,
      temperature: 0.6,
      spicy: 0.5,
      sweet: 0.4,
      salty: 0.6,
      sour: 0.2,
      oily: 0.8,
    },
  },
  {
    name: '파스타',
    weights: {
      meat: 0.5,
      vegetable: 0.5,
      temperature: 0.4,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.4,
      sour: 0.2,
      oily: 0.5,
    },
  },
  {
    name: '김치찌개',
    weights: {
      meat: 0.6,
      vegetable: 0.6,
      temperature: 0.8,
      spicy: 0.7,
      sweet: 0.1,
      salty: 0.7,
      sour: 0.6,
      oily: 0.4,
    },
  },
  {
    name: '된장찌개',
    weights: {
      meat: 0.4,
      vegetable: 0.7,
      temperature: 0.7,
      spicy: 0.2,
      sweet: 0.2,
      salty: 0.6,
      sour: 0.3,
      oily: 0.3,
    },
  },
  {
    name: '제육볶음',
    weights: {
      meat: 0.8,
      vegetable: 0.4,
      temperature: 0.6,
      spicy: 0.6,
      sweet: 0.4,
      salty: 0.5,
      sour: 0.2,
      oily: 0.7,
    },
  },
];

const TITLE = '메뉴 추천기';
const SUB_TITLE = '간단한 문항을 통해 오늘 메뉴를 추천받아 보세요.';

const TodayMenuRecommender = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [showAllRankings, setShowAllRankings] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [result, setResult] = useState<{
    first: MenuResult;
    second: MenuResult;
    third: MenuResult;
    allRankings: { menu: MenuResult; score: number }[];
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
    const totalWeights = {
      meat: 0,
      vegetable: 0,
      temperature: 0,
      spicy: 0,
      sweet: 0,
      salty: 0,
      sour: 0,
      oily: 0,
    };

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

    setResult({
      first: menuScores[0].menu,
      second: menuScores[1].menu,
      third: menuScores[2].menu,
      allRankings: menuScores,
      userWeights: totalWeights,
    });
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setShowAllRankings(false);
    setResult(null);
  };

  const getRadarData = (weights: { [key: string]: number }) => {
    return [
      { subject: '육류', value: weights.meat * 100 },
      { subject: '채소', value: weights.vegetable * 100 },
      { subject: '온도', value: weights.temperature * 100 },
      { subject: '매운맛', value: weights.spicy * 100 },
      { subject: '단맛', value: weights.sweet * 100 },
      { subject: '짠맛', value: weights.salty * 100 },
      { subject: '신맛', value: weights.sour * 100 },
      { subject: '기름기', value: weights.oily * 100 },
    ];
  };

  const handleShare = () => {
    const textToCopy = `오늘의 추천 메뉴는 ${result?.first.name}입니다!\n\n1위: ${result?.first.name}\n2위: ${result?.second.name}\n3위: ${result?.third.name}\n\n나의 취향 분석 결과를 확인해보세요!\n${window.location.href}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowToast(true);
    });
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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    추천 메뉴
                  </Typography>
                  {result && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        1순위: {result.first.name}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        2순위: {result.second.name}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        3순위: {result.third.name}
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
                      <Box
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        gap={1}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Button variant="contained" onClick={resetTest} sx={{ width: '40%' }}>
                          다시하기
                        </Button>

                        <Button variant="contained" onClick={handleShare} sx={{ width: '40%' }}>
                          공유하기
                        </Button>

                        <Button
                          variant="outlined"
                          onClick={() => setShowAllRankings(!showAllRankings)}
                          sx={{ width: '40%' }}
                        >
                          {showAllRankings ? '전체 순위 닫기' : '전체 순위 보기'}
                        </Button>

                        {showAllRankings && (
                          <Box
                            sx={{
                              mt: 2,
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              전체 순위
                            </Typography>
                            {result.allRankings.map((item, index) => (
                              <Typography
                                key={index}
                                variant="body2"
                                sx={{
                                  mt: 1,
                                  color: index < 3 ? 'primary.main' : 'text.secondary',
                                  fontWeight: index < 3 ? 'bold' : 'normal',
                                }}
                              >
                                {index + 1}위: {item.menu.name}
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              </>
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
