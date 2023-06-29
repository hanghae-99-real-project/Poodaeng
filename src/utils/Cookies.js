import { Cookies } from 'react-cookie'

const cookies = new Cookies()

/**
 * @param {string} name 
 * @param {string} refreshToken
 * @param {Date} expires
 */
const setCookie = (name, refreshToken, expires) => {
  return cookies.set(name, refreshToken, {secure: true, expires, httpOnly: true, path: '/', sameSite: 'lax'});
}

/**
 * @param {string} name
 */
const getCookie = (name) => {
  return cookies.get(name);
}

export { setCookie, getCookie };