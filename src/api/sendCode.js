import axios from "axios"

const sendCodeNumber = async (inputs) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/authCodeSend`, inputs)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

const validateCodeNumber = async (inputs) => {
  /* 잠깐 테스트용 bdoy 데이터가 달라서 회원가입이 안 됐음... */
  // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/authCodeVaildation`, inputs)
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/authCodeValidation`, inputs)
  return response
}

const signUp = async (inputs) => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/users`, inputs)
  return response
}

const signIn = async (inputs) => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, inputs)
  return response
}

export {sendCodeNumber , validateCodeNumber, signUp, signIn}