/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  //  // calc를 사용할 수 있게 만들어준다.
  mode:"jit",
  theme: {
    /* 그냥 theme 밑에 쓰는 것은 기존 단위를 덮어쓰기도 하고 초기화 시킴. */
    // screens:{
    //   lg: "1000px",
    // },
    /** @테마설정 */
    extend: {
      backgroundImage:{
        'background': 'url(/src/assets/images/background.svg)'
      },
      colors: {
        mainColor: '#8722ED',
        testColor: {
          100: '#FF8A3D',
          200: '#9da832',
        },
        toggleColor: {
          white: '#FFFFFF',
          black: '#D9D9D9',
        }
      },
      keyframes: {
        emerge: {
          from: { transfrom: 'translateY(200px)'},
          to: { transfrom: 'translateY(0px)'}
        }
      },
      animation: {
        emerge:'emerge 1s ease-in-out',
      },
      screens: {
        'mobile': {'raw': '(max-height: 813px)'},
        // 'mobile': '812px',
      // 'custombp': {'raw': '(max-height: 1234px),(min-width:920px)'}
      //   'tablet': '640px',
      // // => @media (min-width: 640px) { ... }

      // 'laptop': '1024px',
      // // => @media (min-width: 1024px) { ... }

      // 'desktop': '1280px',
      // // => @media (min-width: 1280px) { ... }
      }
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
