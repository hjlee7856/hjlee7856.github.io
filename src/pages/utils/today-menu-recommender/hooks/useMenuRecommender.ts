import { useState } from 'react';
import { MenuResult, menuResults } from '../menu';
import { questions } from '../questions';

interface MenuRecommenderResult {
  first: MenuResult;
  second: MenuResult;
  third: MenuResult;
  allRankings: { menu: MenuResult; score: number }[];
  userWeights: { [key: string]: number };
}

export const useMenuRecommender = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [showAllRankings, setShowAllRankings] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [result, setResult] = useState<MenuRecommenderResult | null>(null);

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

    // 사용자 응답의 가중치 계산
    Object.entries(answers).forEach(([questionIndex, optionIndex]) => {
      const question = questions[parseInt(questionIndex)];
      const option = question.options[optionIndex];

      Object.entries(option.weights).forEach(([key, value]) => {
        totalWeights[key as keyof typeof totalWeights] += value;
      });
    });

    // 평균 가중치 계산
    const questionCount = questions.length;
    Object.keys(totalWeights).forEach((key) => {
      totalWeights[key as keyof typeof totalWeights] /= questionCount;
    });

    // 각 메뉴의 점수 계산
    const menuScores = menuResults.map((menu) => {
      let score = 0;
      let attributeCount = 0;

      // 속성별 점수 계산
      Object.entries(menu.weights).forEach(([key, value]) => {
        const similarity = 1 - Math.abs(value - totalWeights[key as keyof typeof totalWeights]);
        score += similarity;
        attributeCount++;
      });

      // 최종 점수 계산 (0-100)
      const finalScore = (score / attributeCount) * 100;

      return { menu, score: finalScore };
    });

    // 점수순으로 정렬
    menuScores.sort((a, b) => b.score - a.score);

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

  const handleShare = () => {
    const textToCopy = `오늘의 추천 메뉴는 ${result?.first.name}입니다!\n\n1위: ${result?.first.name}\n2위: ${result?.second.name}\n3위: ${result?.third.name}\n\n나의 취향 분석 결과를 확인해보세요!\n${window.location.href}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowToast(true);
    });
  };

  const toggleRankings = () => {
    setShowAllRankings(!showAllRankings);
  };

  return {
    currentQuestionIndex,
    answers,
    showResult,
    showAllRankings,
    showToast,
    result,
    handleAnswer,
    resetTest,
    handleShare,
    toggleRankings,
    setShowToast,
  };
};
