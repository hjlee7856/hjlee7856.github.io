export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: '오늘은 어떤 맛이 당기시나요?',
    options: [
      { text: '매콤한 맛이 땡겨요' },
      { text: '달콤한 맛이 땡겨요' },
      { text: '짭짤한 맛이 땡겨요' },
      { text: '새콤한 맛이 땡겨요' },
    ],
  },
  {
    id: 2,
    text: '음식의 온도는 어떤게 좋으신가요?',
    options: [
      { text: '뜨거운 음식이 좋아요' },
      { text: '차가운 음식이 좋아요' },
      { text: '상온의 음식이 좋아요' },
    ],
  },
  {
    id: 3,
    text: '어떤 주재료를 선호하시나요?',
    options: [
      { text: '면 요리가 좋아요' },
      { text: '밥 요리가 좋아요' },
      { text: '고기가 주재료인 요리가 좋아요' },
      { text: '해산물이 주재료인 요리가 좋아요' },
    ],
  },
  {
    id: 4,
    text: '매운 음식을 어느 정도 드실 수 있나요?',
    options: [
      { text: '매운 음식을 잘 먹어요' },
      { text: '적당히 매운 정도가 좋아요' },
      { text: '매운 음식은 피하고 싶어요' },
    ],
  },
  {
    id: 5,
    text: '건강을 고려하시나요?',
    options: [{ text: '건강한 음식을 먹고 싶어요' }, { text: '오늘은 맛있는게 우선이에요' }],
  },
  {
    id: 6,
    text: '식사 시간이 얼마나 있으신가요?',
    options: [{ text: '빨리 먹을 수 있는 음식이 좋아요' }, { text: '천천히 즐기면서 먹고 싶어요' }],
  },
  {
    id: 7,
    text: '식사 비용은 어느 정도로 생각하시나요?',
    options: [{ text: '가성비 좋은 음식이 좋아요' }, { text: '가격이 있어도 맛있는게 좋아요' }],
  },
  {
    id: 8,
    text: '기름진 음식을 어떻게 생각하시나요?',
    options: [{ text: '기름진 음식이 땡겨요' }, { text: '담백한 음식이 좋아요' }],
  },
];
