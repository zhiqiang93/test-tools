import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserToken = 'usertoken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getAdminToken() {
  return Cookies.get(UserToken)
}

export function getWsToken () {
  return Cookies.get('WS-TOKEN')
}
export function setWsToken (token) {
  return Cookies.set('WS-TOKEN', token)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function setAdminToken(token) {
  return Cookies.set(UserToken, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeAdminToken() {
  return Cookies.remove(UserToken)
}

export function setUsername(name) {
  return Cookies.set('userName', name)
}

export function getUsername() {
  return Cookies.get('userName')
}

export function getThisToken(token) {
  return Cookies.get(token)
}

export function setThisToken(tokenname,token) {
  return Cookies.set(tokenname,token)
}

export function removeThisToken(thisToken) {
  return Cookies.remove(thisToken)
}
