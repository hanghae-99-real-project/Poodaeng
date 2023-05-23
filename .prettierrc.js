// .prettierrc.js
// 일부 규칙을 추가했다.
// 그리고 주석을 적기 위해 json이 아닌 js파일로 생성하였음.

module.exports = {
  // doubleQuote: true,
  // 문자열은 singleQuote로 ("" -> '')
  singleQuote: true,
  //코드 마지막에 세미콜론이 있게 formatting
  semi: true,
  // 들여쓰기 너비는 2칸
  tabWidth: 2,
  // 배열 키:값 뒤에 항상 콤마를 붙히도록 formatting
  trailingComma: 'all',
  // 코드 한줄이 maximum 80칸
  printWidth: 80,
  // 화살표 함수가 하나의 매개변수를 받을 때 괄호를 생략하게 formatting
  arrowParens: 'avoid',
  // windows에 뜨는 'Delete cr' 에러 해결
  endOfLine: 'auto',
  bracketSpacing: true, // 중괄호 내에 공백 사용,
  // 주석에서 '//' 다음에 예외 블록, 공백 또는 탭이 오도록 설정
  // Expected exception block, space or tab after '//' in comment.eslint
  // 에러를 해결하기 위한 설정입니다.
  // 원하는 대로 예외 블록, 공백 또는 탭을 지정해 주세요.
  // 예를 들어, 'always'로 설정하면 '//' 다음에 공백이 필요합니다.
  // 'never'로 설정하면 '//' 다음에 공백이 오면 에러가 발생합니다.
  // commentLineExceptions: ['always'],
  annotationSpacing: 'always',
};
