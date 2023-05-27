/* eslint-disable import/prefer-default-export */
const areaList = [
  '마포구 연남동',
  '마포구 일남동',
  '마포구 이남동',
  '마포구 삼남동',
  '마포구 사남동',
];

const interestOptions = [
  { value: 'workout', label: 'Workout', color: '#00B8D9', isFixed: true },
  // { value: "game", label: "Game", color: "#0052CC", isDisabled: true },
  { value: 'game', label: 'Game', color: '#0052CC' },
  { value: 'coding', label: 'Coding', color: '#5243AA' },
  { value: 'traveling', label: 'Traveling', color: '#FF5630', isFixed: true },
  { value: 'music', label: 'Music', color: '#FF8B00' },
  { value: 'movie', label: 'Movie', color: '#FFC400' },
  { value: 'cooking', label: 'Cooking', color: '#36B37E' },
  { value: 'pet', label: 'Pet', color: '#00875A' },
  { value: 'book', label: 'Book', color: '#253858' },
  { value: 'art', label: 'Art', color: '#666666' },
];

export { areaList, interestOptions };