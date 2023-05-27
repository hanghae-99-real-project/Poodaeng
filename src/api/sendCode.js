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
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/authCodeValidation`, inputs)
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

const signUp = async (inputs) => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/users`, inputs)
  return response
}

export {sendCodeNumber , validateCodeNumber, signUp}
