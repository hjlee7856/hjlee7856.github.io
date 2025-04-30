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
      vegetable: 0.7,
      temperature: 0.9,
      spicy: 0.8,
      sweet: 0.1,
      salty: 0.6,
      sour: 0.5,
      oily: 0.4,
    },
  },
  {
    id: 2,
    name: '국밥',
    category: '한식',
    mainIngredient: '밥',
    description:
      '따뜻한 국물을 좋아하시는 분께 추천드립니다. 진한 육수와 부드러운 고기가 어우러진 영양만점 메뉴입니다.',
    weights: {
      meat: 0.7,
      vegetable: 0.3,
      temperature: 0.9,
      spicy: 0.2,
      sweet: 0.1,
      salty: 0.6,
      sour: 0.1,
      oily: 0.4,
    },
  },
  {
    id: 3,
    name: '불고기',
    category: '한식',
    mainIngredient: '고기',
    description:
      '달콤짭짤한 맛이 특징인 고기 요리로, 고기를 좋아하시는 분께 추천드립니다. 따뜻한 밥과 함께 즐기면 더욱 좋습니다.',
    weights: {
      meat: 0.9,
      vegetable: 0.3,
      temperature: 0.7,
      spicy: 0.2,
      sweet: 0.7,
      salty: 0.6,
      sour: 0.1,
      oily: 0.5,
    },
  },
  {
    id: 4,
    name: '볶음밥',
    category: '중식',
    mainIngredient: '밥',
    description:
      '밥을 좋아하시는 분께 추천드립니다. 다양한 재료와 함께 볶아낸 밥으로, 고소한 맛이 특징입니다.',
    weights: {
      meat: 0.4,
      vegetable: 0.5,
      temperature: 0.3,
      spicy: 0.3,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.1,
      oily: 0.6,
    },
  },
  {
    id: 5,
    name: '제육볶음',
    category: '한식',
    mainIngredient: '고기',
    description:
      '매콤달콤한 맛이 특징인 고기 요리로, 매운 맛을 선호하시는 분께 추천드립니다. 따뜻한 밥과 함께 즐기면 더욱 좋습니다.',
    weights: {
      meat: 0.8,
      vegetable: 0.4,
      temperature: 0.7,
      spicy: 0.7,
      sweet: 0.5,
      salty: 0.6,
      sour: 0.2,
      oily: 0.6,
    },
  },
  // 중식
  {
    id: 6,
    name: '짜장면',
    category: '중식',
    mainIngredient: '면',
    description:
      '달콤짭짤한 맛이 특징인 면 요리로, 짭짤한 맛을 선호하시는 분께 추천드립니다. 기름진 맛이 있어 든든한 한 끼 식사로 좋습니다.',
    weights: {
      meat: 0.5,
      vegetable: 0.4,
      temperature: 0.8,
      spicy: 0.1,
      sweet: 0.4,
      salty: 0.7,
      sour: 0.1,
      oily: 0.8,
    },
  },
  {
    id: 7,
    name: '짬뽕',
    category: '중식',
    mainIngredient: '면',
    description:
      '매콤한 해물 국물이 특징인 면 요리로, 매운 맛을 선호하시는 분께 추천드립니다. 해산물이 들어가 있어 영양가가 풍부합니다.',
    weights: {
      meat: 0.4,
      vegetable: 0.5,
      temperature: 0.9,
      spicy: 0.8,
      sweet: 0.2,
      salty: 0.6,
      sour: 0.3,
      oily: 0.5,
    },
  },
  {
    id: 8,
    name: '울면',
    category: '중식',
    mainIngredient: '면',
    description:
      '짬뽕과 짜장면의 중간 맛을 가진 면 요리로, 적당한 매운 맛을 선호하시는 분께 추천드립니다. 해산물과 야채가 골고루 들어가 있습니다.',
    weights: {
      meat: 0.4,
      vegetable: 0.5,
      temperature: 0.8,
      spicy: 0.5,
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
      '진한 소고기 육수가 특징인 면 요리로, 고기를 좋아하시는 분께 추천드립니다. 뜨거운 국물이 있어 추운 날씨에 특히 좋습니다.',
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
    name: '마파두부',
    category: '중식',
    mainIngredient: '밥',
    description:
      '매콤한 두부 요리로, 매운 맛을 선호하시는 분께 추천드립니다. 부드러운 두부와 매콤한 소스가 어우러져 밥과 함께 즐기기 좋습니다.',
    weights: {
      meat: 0.3,
      vegetable: 0.7,
      temperature: 0.7,
      spicy: 0.7,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.2,
      oily: 0.5,
    },
  },
  // 일식
  {
    id: 11,
    name: '텐동',
    category: '일식',
    mainIngredient: '밥',
    description:
      '바삭하게 튀긴 새우와 야채를 밥 위에 올린 덮밥으로, 기름진 음식을 선호하시는 분께 추천드립니다. 특제 소스와 함께 먹는 것이 특징입니다.',
    weights: {
      meat: 0.5,
      vegetable: 0.4,
      temperature: 0.7,
      spicy: 0.1,
      sweet: 0.4,
      salty: 0.5,
      sour: 0.1,
      oily: 0.8,
    },
  },
  {
    id: 12,
    name: '규동',
    category: '일식',
    mainIngredient: '밥',
    description:
      '달콤짭짤한 소스로 조리된 소고기를 밥 위에 올린 덮밥으로, 고기를 좋아하시는 분께 추천드립니다. 따뜻한 밥과 함께 즐기면 더욱 좋습니다.',
    weights: {
      meat: 0.8,
      vegetable: 0.2,
      temperature: 0.7,
      spicy: 0.1,
      sweet: 0.6,
      salty: 0.5,
      sour: 0.1,
      oily: 0.5,
    },
  },
  {
    id: 13,
    name: '우동',
    category: '일식',
    mainIngredient: '면',
    description:
      '쫄깃한 면과 진한 국물이 특징인 면 요리로, 담백한 맛을 선호하시는 분께 추천드립니다. 뜨거운 국물이 있어 추운 날씨에 특히 좋습니다.',
    weights: {
      meat: 0.3,
      vegetable: 0.4,
      temperature: 0.9,
      spicy: 0.1,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.1,
      oily: 0.3,
    },
  },
  {
    id: 14,
    name: '소바',
    category: '일식',
    mainIngredient: '면',
    description:
      '메밀면의 고소한 맛이 특징인 면 요리로, 담백한 맛을 선호하시는 분께 추천드립니다. 차가운 육수와 함께 즐겨 여름철에 특히 인기가 많습니다.',
    weights: {
      meat: 0.2,
      vegetable: 0.4,
      temperature: 0.2,
      spicy: 0.1,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.1,
      oily: 0.2,
    },
  },
  {
    id: 15,
    name: '돈카츠',
    category: '일식',
    mainIngredient: '고기',
    description:
      '바삭하게 튀긴 돼지고기 커틀릿으로, 기름진 음식을 선호하시는 분께 추천드립니다. 특제 소스와 함께 먹는 것이 특징입니다.',
    weights: {
      meat: 0.8,
      vegetable: 0.2,
      temperature: 0.7,
      spicy: 0.1,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.1,
      oily: 0.8,
    },
  },
  // 양식
  {
    id: 16,
    name: '스테이크',
    category: '양식',
    mainIngredient: '고기',
    description:
      '고급스러운 소고기 요리로, 고기를 좋아하시는 분께 추천드립니다. 다양한 소스와 함께 즐길 수 있어 특별한 날에 좋습니다.',
    weights: {
      meat: 0.9,
      vegetable: 0.2,
      temperature: 0.7,
      spicy: 0.1,
      sweet: 0.2,
      salty: 0.5,
      sour: 0.1,
      oily: 0.6,
    },
  },
  {
    id: 17,
    name: '파스타',
    category: '양식',
    mainIngredient: '면',
    description:
      '이탈리아 전통 면 요리로, 다양한 소스와 함께 즐길 수 있습니다. 크림 소스는 기름진 맛을, 토마토 소스는 새콤한 맛을 선호하시는 분께 추천드립니다.',
    weights: {
      meat: 0.4,
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
    name: '샐러드',
    category: '양식',
    mainIngredient: '기타',
    description:
      '신선한 채소와 다양한 재료가 들어간 건강식으로, 건강을 고려하시는 분께 추천드립니다. 새콤달콤한 드레싱과 함께 즐기면 더욱 좋습니다.',
    weights: {
      meat: 0.2,
      vegetable: 0.9,
      temperature: 0.2,
      spicy: 0.1,
      sweet: 0.3,
      salty: 0.3,
      sour: 0.4,
      oily: 0.2,
    },
  },
  {
    id: 19,
    name: '햄버거',
    category: '양식',
    mainIngredient: '고기',
    description:
      '고기를 좋아하시는 분께 추천드립니다. 육즙이 풍부한 패티와 신선한 야채가 어우러진 클래식한 맛을 선사합니다.',
    weights: {
      meat: 0.8,
      vegetable: 0.4,
      temperature: 0.3,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.5,
      sour: 0.1,
      oily: 0.6,
    },
  },
  {
    id: 20,
    name: '샌드위치',
    category: '양식',
    mainIngredient: '기타',
    description:
      '다양한 재료가 들어간 간편식으로, 빠르게 식사를 해결하고 싶으신 분께 추천드립니다. 상온에서 즐길 수 있어 간편하게 먹기 좋습니다.',
    weights: {
      meat: 0.5,
      vegetable: 0.5,
      temperature: 0.5,
      spicy: 0.2,
      sweet: 0.3,
      salty: 0.4,
      sour: 0.2,
      oily: 0.4,
    },
  },
];
