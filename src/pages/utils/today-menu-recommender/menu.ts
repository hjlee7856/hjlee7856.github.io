export interface MenuResult {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식';
  mainIngredient: '면' | '밥' | '고기' | '해산물' | '기타';
  description: string;
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

export const menuResults: MenuResult[] = [
  // 한식
  {
    id: 1,
    name: '김치찌개',
    category: '한식',
    mainIngredient: '고기',
    description:
      '고기와 야채가 골고루 들어간 영양식으로, 매콤한 맛을 선호하시는 분께 추천드립니다. 뜨거운 국물이 있어 추운 날씨에 특히 좋습니다.',
    weights: {
      meat: 0.6,
      vegetable: 0.6,
      temperature: 0.9,
      spicy: 0.8,
      sweet: 0.1,
      salty: 0.7,
      sour: 0.6,
      oily: 0.5,
    },
  },
  {
    id: 2,
    name: '된장찌개',
    category: '한식',
    mainIngredient: '기타',
    description:
      '건강식을 선호하시는 분께 추천드립니다. 된장의 발효효과로 소화가 잘 되며, 야채가 풍부하게 들어가 있어 영양가가 높습니다.',
    weights: {
      meat: 0.3,
      vegetable: 0.8,
      temperature: 0.9,
      spicy: 0.3,
      sweet: 0.2,
      salty: 0.7,
      sour: 0.3,
      oily: 0.3,
    },
  },
  {
    id: 3,
    name: '비빔밥',
    category: '한식',
    mainIngredient: '밥',
    description:
      '다양한 영양소를 골고루 섭취하고 싶으신 분께 추천드립니다. 나물과 고기, 계란이 균형있게 들어가 있어 건강식으로 좋습니다.',
    weights: {
      meat: 0.4,
      vegetable: 0.8,
      temperature: 0.6,
      spicy: 0.5,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.4,
      oily: 0.3,
    },
  },
  {
    id: 4,
    name: '제육볶음',
    category: '한식',
    mainIngredient: '고기',
    description:
      '고기를 좋아하시는 분께 추천드립니다. 매콤달콤한 맛이 특징이며, 밥과 함께 먹으면 더욱 맛있습니다.',
    weights: {
      meat: 0.9,
      vegetable: 0.3,
      temperature: 0.8,
      spicy: 0.7,
      sweet: 0.4,
      salty: 0.6,
      sour: 0.2,
      oily: 0.7,
    },
  },
  {
    id: 5,
    name: '냉면',
    category: '한식',
    mainIngredient: '면',
    description:
      '더운 날씨에 시원한 음식을 원하시는 분께 추천드립니다. 쫄깃한 면과 시원한 육수가 조화를 이루어 여름철에 특히 인기가 많습니다.',
    weights: {
      meat: 0.3,
      vegetable: 0.4,
      temperature: 0.1,
      spicy: 0.2,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.6,
      oily: 0.2,
    },
  },
  // 중식
  {
    id: 6,
    name: '짜장면',
    category: '중식',
    mainIngredient: '면',
    description:
      '매운 맛을 피하고 싶으신 분께 추천드립니다. 달콤하고 진한 춘장소스가 특징이며, 면과 잘 어우러져 부드러운 맛을 선사합니다.',
    weights: {
      meat: 0.4,
      vegetable: 0.4,
      temperature: 0.7,
      spicy: 0.1,
      sweet: 0.3,
      salty: 0.6,
      sour: 0.1,
      oily: 0.7,
    },
  },
  {
    id: 7,
    name: '짬뽕',
    category: '중식',
    mainIngredient: '면',
    description:
      '매운 맛을 좋아하시는 분께 추천드립니다. 해물육수의 깊은 맛과 매콤한 맛이 조화를 이루어 풍부한 맛을 선사합니다.',
    weights: {
      meat: 0.5,
      vegetable: 0.6,
      temperature: 0.9,
      spicy: 0.8,
      sweet: 0.2,
      salty: 0.7,
      sour: 0.2,
      oily: 0.6,
    },
  },
  {
    id: 8,
    name: '울면',
    category: '중식',
    mainIngredient: '면',
    description:
      '짬뽕과 짜장면의 중간 맛을 원하시는 분께 추천드립니다. 매콤하지 않으면서도 깊은 맛이 있어 다양한 취향을 만족시킵니다.',
    weights: {
      meat: 0.5,
      vegetable: 0.5,
      temperature: 0.8,
      spicy: 0.3,
      sweet: 0.3,
      salty: 0.6,
      sour: 0.2,
      oily: 0.5,
    },
  },
  {
    id: 9,
    name: '우육면',
    category: '중식',
    mainIngredient: '면',
    description:
      '진한 소고기 육수를 좋아하시는 분께 추천드립니다. 쫄깃한 면과 부드러운 소고기가 어우러져 깊은 맛을 선사합니다.',
    weights: {
      meat: 0.7,
      vegetable: 0.3,
      temperature: 0.9,
      spicy: 0.2,
      sweet: 0.2,
      salty: 0.6,
      sour: 0.1,
      oily: 0.4,
    },
  },
  {
    id: 10,
    name: '볶음밥',
    category: '중식',
    mainIngredient: '밥',
    description:
      '간단하면서도 영양가 있는 식사를 원하시는 분께 추천드립니다. 다양한 재료가 들어가 있어 한 그릇으로도 충분한 영양을 섭취할 수 있습니다.',
    weights: {
      meat: 0.5,
      vegetable: 0.5,
      temperature: 0.8,
      spicy: 0.3,
      sweet: 0.2,
      salty: 0.6,
      sour: 0.1,
      oily: 0.6,
    },
  },
  // 일식
  {
    id: 11,
    name: '텐동',
    category: '일식',
    mainIngredient: '밥',
    description:
      '튀긴 음식을 좋아하시는 분께 추천드립니다. 바삭한 새우튀김과 밥이 어우러져 든든한 한 끼 식사가 됩니다.',
    weights: {
      meat: 0.5,
      vegetable: 0.4,
      temperature: 0.7,
      spicy: 0.1,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.2,
      oily: 0.6,
    },
  },
  {
    id: 12,
    name: '라멘',
    category: '일식',
    mainIngredient: '면',
    description:
      '뜨거운 국물을 좋아하시는 분께 추천드립니다. 진한 육수와 쫄깃한 면이 어우러져 든든한 한 그릇을 선사합니다.',
    weights: {
      meat: 0.5,
      vegetable: 0.4,
      temperature: 0.9,
      spicy: 0.4,
      sweet: 0.2,
      salty: 0.7,
      sour: 0.2,
      oily: 0.6,
    },
  },
  {
    id: 13,
    name: '돈카츠',
    category: '일식',
    mainIngredient: '고기',
    description:
      '고기를 좋아하시는 분께 추천드립니다. 두툼한 돼지고기의 육즙과 바삭한 튀김옷이 조화를 이루어 만족스러운 식사를 선사합니다.',
    weights: {
      meat: 0.9,
      vegetable: 0.2,
      temperature: 0.7,
      spicy: 0.1,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.2,
      oily: 0.8,
    },
  },
  {
    id: 14,
    name: '소바',
    category: '일식',
    mainIngredient: '면',
    description:
      '가벼운 식사를 원하시는 분께 추천드립니다. 메밀면의 고소한 맛과 차가운 육수가 어우러져 여름철에 특히 인기가 많습니다.',
    weights: {
      meat: 0.2,
      vegetable: 0.4,
      temperature: 0.2,
      spicy: 0.1,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.3,
      oily: 0.2,
    },
  },
  {
    id: 15,
    name: '우동',
    category: '일식',
    mainIngredient: '면',
    description:
      '가벼운 식사를 원하시는 분께 추천드립니다. 맑은 육수와 쫄깃한 면이 어우러져 부담없이 즐기실 수 있습니다.',
    weights: {
      meat: 0.3,
      vegetable: 0.3,
      temperature: 0.8,
      spicy: 0.1,
      sweet: 0.2,
      salty: 0.6,
      sour: 0.1,
      oily: 0.3,
    },
  },
  // 양식
  {
    id: 16,
    name: '피자',
    category: '양식',
    mainIngredient: '기타',
    description:
      '여러 사람과 함께 나누어 먹기 좋은 음식을 원하시는 분께 추천드립니다. 다양한 토핑과 치즈의 조화가 특징입니다.',
    weights: {
      meat: 0.7,
      vegetable: 0.4,
      temperature: 0.7,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.6,
      sour: 0.2,
      oily: 0.8,
    },
  },
  {
    id: 17,
    name: '파스타',
    category: '양식',
    mainIngredient: '면',
    description:
      '이탈리아 음식을 좋아하시는 분께 추천드립니다. 알덴테의 쫄깃한 면과 다양한 소스가 조화를 이루어 만족스러운 식사를 선사합니다.',
    weights: {
      meat: 0.5,
      vegetable: 0.4,
      temperature: 0.7,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.3,
      oily: 0.6,
    },
  },
  {
    id: 18,
    name: '샌드위치',
    category: '양식',
    mainIngredient: '기타',
    description:
      '간편한 식사를 원하시는 분께 추천드립니다. 신선한 재료들이 빵 사이에 잘 어우러져 영양가 있으면서도 휴대하기 좋습니다.',
    weights: {
      meat: 0.6,
      vegetable: 0.5,
      temperature: 0.4,
      spicy: 0.2,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.2,
      oily: 0.4,
    },
  },
  {
    id: 19,
    name: '햄버거',
    category: '양식',
    mainIngredient: '고기',
    description:
      '고기를 좋아하시는 분께 추천드립니다. 두툼한 패티와 신선한 야채가 어우러져 만족스러운 식사를 선사합니다.',
    weights: {
      meat: 0.8,
      vegetable: 0.3,
      temperature: 0.6,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.6,
      sour: 0.2,
      oily: 0.8,
    },
  },
  {
    id: 20,
    name: '샐러드',
    category: '양식',
    mainIngredient: '기타',
    description:
      '건강식을 선호하시는 분께 추천드립니다. 신선한 야채와 다양한 재료가 어우러져 가벼우면서도 영양가 있는 식사를 즐기실 수 있습니다.',
    weights: {
      meat: 0.2,
      vegetable: 0.9,
      temperature: 0.3,
      spicy: 0.1,
      sweet: 0.2,
      salty: 0.3,
      sour: 0.3,
      oily: 0.2,
    },
  },
];
