export interface Question {
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

export const questions: Question[] = [
  {
    id: 1,
    text: '오늘은 어떤 맛이 당기시나요?',
    options: [
      {
        text: '매콤한 맛이 땡겨요',
        weights: {
          meat: 0.6,
          vegetable: 0.5,
          temperature: 0.7,
          spicy: 0.9,
          sweet: 0.2,
          salty: 0.6,
          sour: 0.3,
          oily: 0.5,
        },
      },
      {
        text: '달콤한 맛이 땡겨요',
        weights: {
          meat: 0.5,
          vegetable: 0.4,
          temperature: 0.6,
          spicy: 0.2,
          sweet: 0.9,
          salty: 0.4,
          sour: 0.2,
          oily: 0.6,
        },
      },
      {
        text: '짭짤한 맛이 땡겨요',
        weights: {
          meat: 0.7,
          vegetable: 0.5,
          temperature: 0.7,
          spicy: 0.3,
          sweet: 0.2,
          salty: 0.9,
          sour: 0.2,
          oily: 0.5,
        },
      },
      {
        text: '새콤한 맛이 땡겨요',
        weights: {
          meat: 0.4,
          vegetable: 0.7,
          temperature: 0.5,
          spicy: 0.2,
          sweet: 0.3,
          salty: 0.4,
          sour: 0.9,
          oily: 0.3,
        },
      },
    ],
  },
  {
    id: 2,
    text: '음식의 온도는 어떤게 좋으신가요?',
    options: [
      {
        text: '뜨거운 음식이 좋아요',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.9,
          spicy: 0.6,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.3,
          oily: 0.5,
        },
      },
      {
        text: '차가운 음식이 좋아요',
        weights: {
          meat: 0.4,
          vegetable: 0.6,
          temperature: 0.2,
          spicy: 0.3,
          sweet: 0.4,
          salty: 0.4,
          sour: 0.4,
          oily: 0.3,
        },
      },
      {
        text: '상온의 음식이 좋아요',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.5,
          spicy: 0.4,
          sweet: 0.4,
          salty: 0.4,
          sour: 0.3,
          oily: 0.4,
        },
      },
    ],
  },
  {
    id: 3,
    text: '어떤 주재료를 선호하시나요?',
    options: [
      {
        text: '면 요리가 좋아요',
        weights: {
          meat: 0.4,
          vegetable: 0.4,
          temperature: 0.7,
          spicy: 0.5,
          sweet: 0.3,
          salty: 0.6,
          sour: 0.2,
          oily: 0.5,
        },
      },
      {
        text: '밥 요리가 좋아요',
        weights: {
          meat: 0.5,
          vegetable: 0.6,
          temperature: 0.6,
          spicy: 0.4,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.3,
          oily: 0.4,
        },
      },
      {
        text: '고기가 주재료인 요리가 좋아요',
        weights: {
          meat: 0.9,
          vegetable: 0.3,
          temperature: 0.6,
          spicy: 0.4,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.2,
          oily: 0.7,
        },
      },
      {
        text: '해산물이 주재료인 요리가 좋아요',
        weights: {
          meat: 0.7,
          vegetable: 0.4,
          temperature: 0.5,
          spicy: 0.3,
          sweet: 0.2,
          salty: 0.5,
          sour: 0.3,
          oily: 0.4,
        },
      },
    ],
  },
  {
    id: 4,
    text: '매운 음식을 어느 정도 드실 수 있나요?',
    options: [
      {
        text: '매운 음식을 잘 먹어요',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.7,
          spicy: 0.9,
          sweet: 0.2,
          salty: 0.6,
          sour: 0.3,
          oily: 0.5,
        },
      },
      {
        text: '적당히 매운 정도가 좋아요',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.3,
          oily: 0.5,
        },
      },
      {
        text: '매운 음식은 피하고 싶어요',
        weights: {
          meat: 0.5,
          vegetable: 0.5,
          temperature: 0.5,
          spicy: 0.1,
          sweet: 0.4,
          salty: 0.4,
          sour: 0.3,
          oily: 0.4,
        },
      },
    ],
  },
  {
    id: 5,
    text: '건강을 고려하시나요?',
    options: [
      {
        text: '건강한 음식을 먹고 싶어요',
        weights: {
          meat: 0.4,
          vegetable: 0.8,
          temperature: 0.5,
          spicy: 0.4,
          sweet: 0.3,
          salty: 0.4,
          sour: 0.3,
          oily: 0.2,
        },
      },
      {
        text: '오늘은 맛있는게 우선이에요',
        weights: {
          meat: 0.7,
          vegetable: 0.3,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.5,
          salty: 0.6,
          sour: 0.3,
          oily: 0.7,
        },
      },
    ],
  },
  {
    id: 6,
    text: '식사 시간이 얼마나 있으신가요?',
    options: [
      {
        text: '빨리 먹을 수 있는 음식이 좋아요',
        weights: {
          meat: 0.5,
          vegetable: 0.4,
          temperature: 0.6,
          spicy: 0.4,
          sweet: 0.4,
          salty: 0.5,
          sour: 0.3,
          oily: 0.6,
        },
      },
      {
        text: '천천히 즐기면서 먹고 싶어요',
        weights: {
          meat: 0.6,
          vegetable: 0.6,
          temperature: 0.7,
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
    id: 7,
    text: '식사 비용은 어느 정도로 생각하시나요?',
    options: [
      {
        text: '가성비 좋은 음식이 좋아요',
        weights: {
          meat: 0.4,
          vegetable: 0.5,
          temperature: 0.5,
          spicy: 0.4,
          sweet: 0.3,
          salty: 0.5,
          sour: 0.3,
          oily: 0.5,
        },
      },
      {
        text: '가격이 있어도 맛있는게 좋아요',
        weights: {
          meat: 0.7,
          vegetable: 0.5,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.4,
          salty: 0.5,
          sour: 0.3,
          oily: 0.6,
        },
      },
    ],
  },
  {
    id: 8,
    text: '기름진 음식을 어떻게 생각하시나요?',
    options: [
      {
        text: '기름진 음식이 땡겨요',
        weights: {
          meat: 0.7,
          vegetable: 0.3,
          temperature: 0.6,
          spicy: 0.5,
          sweet: 0.4,
          salty: 0.6,
          sour: 0.2,
          oily: 0.9,
        },
      },
      {
        text: '담백한 음식이 좋아요',
        weights: {
          meat: 0.4,
          vegetable: 0.7,
          temperature: 0.5,
          spicy: 0.3,
          sweet: 0.3,
          salty: 0.4,
          sour: 0.3,
          oily: 0.2,
        },
      },
    ],
  },
];
