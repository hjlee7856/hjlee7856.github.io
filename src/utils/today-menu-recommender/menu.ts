export interface MenuResult {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식';
  mainIngredient: '면' | '밥' | '고기' | '해산물' | '기타';
  description: string;
}

export const menuResults: MenuResult[] = [
  // 한식
  {
    id: 1,
    name: '김치찌개',
    category: '한식',
    mainIngredient: '고기',
    description:
      '고기와 야채가 골고루 들어간 영양식으로, 매콤한 맛을 선호하시는 분께 추천드립니다. 뜨거운 국물이 있어 추운 날씨에 특히 좋습니다.',
  },
  {
    id: 2,
    name: '국밥',
    category: '한식',
    mainIngredient: '밥',
    description:
      '따뜻한 국물을 좋아하시는 분께 추천드립니다. 진한 육수와 부드러운 고기가 어우러진 영양만점 메뉴입니다.',
  },
  {
    id: 3,
    name: '된장찌개',
    category: '한식',
    mainIngredient: '고기',
    description:
      '구수한 된장 맛이 특징인 국물 요리로, 담백한 맛을 선호하시는 분께 추천드립니다. 뜨거운 국물이 있어 추운 날씨에 특히 좋습니다.',
  },
  {
    id: 4,
    name: '비빔밥',
    category: '한식',
    mainIngredient: '밥',
    description:
      '다양한 채소와 고기가 골고루 들어간 건강식으로, 담백한 맛을 선호하시는 분께 추천드립니다. 상온에서 즐길 수 있어 여름철에 특히 좋습니다.',
  },
  {
    id: 5,
    name: '제육볶음',
    category: '한식',
    mainIngredient: '고기',
    description:
      '매콤달콤한 맛이 특징인 고기 요리로, 매운 맛을 선호하시는 분께 추천드립니다. 따뜻한 밥과 함께 즐기면 더욱 좋습니다.',
  },
  // 중식
  {
    id: 6,
    name: '짜장면',
    category: '중식',
    mainIngredient: '면',
    description:
      '달콤짭짤한 맛이 특징인 면 요리로, 짭짤한 맛을 선호하시는 분께 추천드립니다. 기름진 맛이 있어 든든한 한 끼 식사로 좋습니다.',
  },
  {
    id: 7,
    name: '짬뽕',
    category: '중식',
    mainIngredient: '면',
    description:
      '매콤한 해물 국물이 특징인 면 요리로, 매운 맛을 선호하시는 분께 추천드립니다. 해산물이 들어가 있어 영양가가 풍부합니다.',
  },
  {
    id: 8,
    name: '울면',
    category: '중식',
    mainIngredient: '면',
    description:
      '짬뽕과 짜장면의 중간 맛을 가진 면 요리로, 적당한 매운 맛을 선호하시는 분께 추천드립니다. 해산물과 야채가 골고루 들어가 있습니다.',
  },
  {
    id: 9,
    name: '우육면',
    category: '중식',
    mainIngredient: '면',
    description:
      '진한 소고기 육수가 특징인 면 요리로, 고기를 좋아하시는 분께 추천드립니다. 뜨거운 국물이 있어 추운 날씨에 특히 좋습니다.',
  },
  {
    id: 10,
    name: '볶음밥',
    category: '중식',
    mainIngredient: '밥',
    description:
      '고슬고슬하게 볶아낸 밥 요리로, 담백하면서도 고소한 맛을 선호하시는 분께 추천드립니다. 다양한 재료와 함께 즐길 수 있습니다.',
  },
  // 일식
  {
    id: 11,
    name: '텐동',
    category: '일식',
    mainIngredient: '밥',
    description:
      '바삭하게 튀긴 새우와 야채를 밥 위에 올린 덮밥으로, 기름진 음식을 선호하시는 분께 추천드립니다. 특제 소스와 함께 먹는 것이 특징입니다.',
  },
  {
    id: 12,
    name: '규동',
    category: '일식',
    mainIngredient: '밥',
    description:
      '달콤짭짤한 소스로 조리된 소고기를 밥 위에 올린 덮밥으로, 고기를 좋아하시는 분께 추천드립니다. 따뜻한 밥과 함께 즐기면 더욱 좋습니다.',
  },
  {
    id: 13,
    name: '우동',
    category: '일식',
    mainIngredient: '면',
    description:
      '쫄깃한 면과 진한 국물이 특징인 면 요리로, 담백한 맛을 선호하시는 분께 추천드립니다. 뜨거운 국물이 있어 추운 날씨에 특히 좋습니다.',
  },
  {
    id: 14,
    name: '소바',
    category: '일식',
    mainIngredient: '면',
    description:
      '메밀면의 고소한 맛이 특징인 면 요리로, 담백한 맛을 선호하시는 분께 추천드립니다. 차가운 육수와 함께 즐겨 여름철에 특히 인기가 많습니다.',
  },
  {
    id: 15,
    name: '돈카츠',
    category: '일식',
    mainIngredient: '고기',
    description:
      '바삭하게 튀긴 돼지고기 커틀릿으로, 기름진 음식을 선호하시는 분께 추천드립니다. 특제 소스와 함께 먹는 것이 특징입니다.',
  },
  // 양식
  {
    id: 16,
    name: '리조또',
    category: '양식',
    mainIngredient: '밥',
    description:
      '부드럽고 진한 식감이 특징인 이탈리아식 밥 요리입니다. 치즈와 육수로 고소한 맛을 내며, 크리미한 식감을 선호하시는 분께 추천드립니다.',
  },
  {
    id: 17,
    name: '파스타',
    category: '양식',
    mainIngredient: '면',
    description:
      '이탈리아 전통 면 요리로, 다양한 소스와 함께 즐길 수 있습니다. 크림 소스는 기름진 맛을, 토마토 소스는 새콤한 맛을 선호하시는 분께 추천드립니다.',
  },
  {
    id: 18,
    name: '샐러드',
    category: '양식',
    mainIngredient: '기타',
    description:
      '신선한 채소와 다양한 재료가 들어간 건강식으로, 건강을 고려하시는 분께 추천드립니다. 새콤달콤한 드레싱과 함께 즐기면 더욱 좋습니다.',
  },
  {
    id: 19,
    name: '피자',
    category: '양식',
    mainIngredient: '기타',
    description:
      '다양한 토핑이 올라간 이탈리아 전통 요리로, 기름진 음식을 선호하시는 분께 추천드립니다. 함께 나누어 먹으면 더욱 좋습니다.',
  },
  {
    id: 20,
    name: '샌드위치',
    category: '양식',
    mainIngredient: '기타',
    description:
      '다양한 재료가 들어간 간편식으로, 빠르게 식사를 해결하고 싶으신 분께 추천드립니다. 상온에서 즐길 수 있어 간편하게 먹기 좋습니다.',
  },
];
