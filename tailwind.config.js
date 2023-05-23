/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    /* 그냥 theme 밑에 쓰는 것은 기존 단위를 덮어쓰기도 하고 초기화 시킴. */
    // screens:{
    //   lg: "1000px",
    // },
    /** @테마설정 */
    extend: {
      colors: {
        mainColor: {
          /* 100, 200 같은 것은 단위를 내가 더 잘게 쪼갠 것 */
          100: '#FF8A3D',
          200: '#9da832',
        },
      },
    },
  },
  variants: {
    /** @변형설정 */
  },
  plugins: [],
  corePlugins: {
    /** @기본설정 */
  },
  components: {
    /* 'clickableTextStyle': {
      '@apply': 'font-bold text-[#583f72] ml-3 hover:text-textPurple transition-colors duration-200 cursor-pointer',
    }, */
  },
};
