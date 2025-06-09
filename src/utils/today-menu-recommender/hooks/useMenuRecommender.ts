import { useState } from 'react';
import { MenuResult, menuResults } from '../menu';
import { questions } from '../questions';

interface MenuFilterResult {
  menus: MenuResult[];
}

// 텍스트 기반 필터링
const filterMenuByAnswer = (
  menus: MenuResult[],
  questionIndex: number,
  optionIndex: number
): MenuResult[] => {
  const question = questions[questionIndex];
  const option = question.options[optionIndex];
  const optText = option.text;

  switch (questionIndex) {
    case 0: // 맛
      if (optText.includes('매콤')) return menus.filter((m) => m.description.includes('매콤'));
      if (optText.includes('달콤')) return menus.filter((m) => m.description.includes('달콤'));
      if (optText.includes('짭짤')) return menus.filter((m) => m.description.includes('짭짤'));
      if (optText.includes('새콤')) return menus.filter((m) => m.description.includes('새콤'));
      break;
    case 1: // 온도
      if (optText.includes('뜨거운')) return menus.filter((m) => m.description.includes('뜨거운'));
      if (optText.includes('차가운')) return menus.filter((m) => m.description.includes('차가운'));
      if (optText.includes('상온')) return menus.filter((m) => m.description.includes('상온'));
      break;
    case 2: // 주재료
      if (optText.includes('면')) return menus.filter((m) => m.mainIngredient === '면');
      if (optText.includes('밥')) return menus.filter((m) => m.mainIngredient === '밥');
      if (optText.includes('고기')) return menus.filter((m) => m.mainIngredient === '고기');
      if (optText.includes('해산물')) return menus.filter((m) => m.mainIngredient === '해산물');
      break;
    case 3: // 매운 정도
      if (optText.includes('잘 먹어요')) return menus.filter((m) => m.description.includes('매콤'));
      if (optText.includes('적당히')) return menus.filter((m) => m.description.includes('적당'));
      if (optText.includes('피하고')) return menus.filter((m) => !m.description.includes('매콤'));
      break;
    case 4: // 건강
      if (optText.includes('건강')) return menus.filter((m) => m.description.includes('건강'));
      if (optText.includes('맛있는게')) return menus.filter((m) => m.description.includes('맛있'));
      break;
    case 5: // 식사 시간
      if (optText.includes('빨리'))
        return menus.filter(
          (m) =>
            m.name.includes('샌드위치') || m.name.includes('볶음밥') || m.name.includes('비빔밥')
        );
      if (optText.includes('천천히'))
        return menus.filter(
          (m) => !['샌드위치', '볶음밥', '비빔밥'].some((n) => m.name.includes(n))
        );
      break;
    case 6: // 비용
      if (optText.includes('가성비'))
        return menus.filter((m) => ['국밥', '비빔밥', '샌드위치', '볶음밥'].includes(m.name));
      if (optText.includes('가격이 있어도'))
        return menus.filter((m) => !['국밥', '비빔밥', '샌드위치', '볶음밥'].includes(m.name));
      break;
    case 7: // 기름진 정도
      if (optText.includes('기름진')) return menus.filter((m) => m.description.includes('기름진'));
      if (optText.includes('담백')) return menus.filter((m) => m.description.includes('담백'));
      break;
    default:
      return menus;
  }
  // 기타 선택지는 필터링 없이 반환
  return menus;
};

export const useMenuRecommender = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [result, setResult] = useState<MenuFilterResult | null>(null);
  const [filteredMenus, setFilteredMenus] = useState<MenuResult[]>(menuResults);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: optionIndex };
    setAnswers(newAnswers);

    // 현재까지의 답변으로 메뉴 필터링
    let menus = menuResults;
    for (let i = 0; i <= currentQuestionIndex; i++) {
      const ans = i === currentQuestionIndex ? optionIndex : answers[i];
      menus = filterMenuByAnswer(menus, i, ans);
      // 0개가 되면 필터를 완화(이전 상태 유지)
      if (menus.length === 0) {
        menus = filteredMenus;
        break;
      }
    }
    setFilteredMenus(menus);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setResult({ menus });
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
    setFilteredMenus(menuResults);
  };

  const handleShare = () => {
    if (!result || result.menus.length === 0) return;
    const textToCopy =
      result.menus.length === 1
        ? `오늘의 추천 메뉴는 ${result.menus[0].name}입니다!\n\n${result.menus[0].description}\n\n${window.location.href}`
        : `오늘의 추천 메뉴 후보는 ${result.menus.map((m) => m.name).join(', ')}입니다!\n\n${window.location.href}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowToast(true);
    });
  };

  return {
    currentQuestionIndex,
    answers,
    showResult,
    result,
    handleAnswer,
    resetTest,
    handleShare,
    setShowToast,
    filteredMenus,
    showToast,
  };
};
