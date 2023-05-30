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




/* <div className='relative flex flex-col '>
            <input
              type='text'
              name='nickname'
              value={inputs.nickname}
              onChange={onChangeInputs}
              placeholder='닉네임'
              className='w-80 pb-2 font-bold text-xl border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ]'
            />
            {onValidator('nickname') && (
              <BsCheckLg className='absolute top-0 right-5 text-3xl text-[#76B5FF]' />
            )}
            {!onValidator('nickname') && (
              <span className='error-msg'>{errorMsg[1]}</span>
            )}
          </div>
          <div className='relative flex flex-col '>
            <input
              type='password'
              name='password'
              value={inputs.password}
              onChange={onChangeInputs}
              placeholder='비밀번호'
              className='w-80 pb-2 font-bold text-xl border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ] '
            />
            {onValidator('password') && (
              <BsCheckLg className='absolute top-0 right-5 text-3xl text-[#76B5FF]' />
            )}
            {!onValidator('password') && (
              <span className='error-msg'>{errorMsg[2]}</span>
            )}
          </div>
          <div className='relative flex flex-col '>
            <input
              type='password'
              name='passwordConfirm'
              value={inputs.passwordConfirm}
              onChange={onChangeInputs}
              placeholder='비밀번호 확인'
              className='w-80 pb-2 font-bold text-xl border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ] '
            />
            {inputs.passwordConfirm && onValidator('passwordConfirm') && (
              <BsCheckLg className='absolute top-0 right-5 text-3xl text-[#76B5FF]' />
            )}
            {!onValidator('passwordConfirm') && (
              <span className='error-msg'>{errorMsg[3]}</span>
            )}
          </div> */