import axios from "axios"

const sendCodeNumber = async (inputs) => {
  const response = await axios.post('api/auth/users/auth/CodeSend', inputs)
  return response
}

export default sendCodeNumber

