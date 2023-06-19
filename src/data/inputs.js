const inputContents = [
  {
    type: 'text',
    name: 'nickname',
    value: 'nickname',
    placeholder: '닉네임',
  },
  {
    type: 'password',
    name: 'password',
    value: 'password',
    placeholder: '비밀번호'
  },
  {
    type: 'password',
    name: 'passwordConfirm',
    value: 'passwordConfirm',
    placeholder: '비밀번호 확인'
  },
]

const errorMsg = [
  '번호 형식이 맞지 않습니다.(- 없이 10~11자)',
  '공백 없이 1자 이상',
  '대소문자,숫자,특수문자 포함 8자리 이상 15자 이하',
  '비밀번호가 일치하지 않습니다.',
];

export  {inputContents, errorMsg};