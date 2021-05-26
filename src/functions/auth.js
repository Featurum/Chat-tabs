import CONSTANS from '@/constans/'

export function isLoggedIn () {
    let username = sessionStorage.getItem(CONSTANS.STORAGE_LOGIN)
    return !!username && username !== ''
}

export function getUser () {
  	let user = sessionStorage.getItem(CONSTANS.STORAGE_LOGIN)
  	return JSON.parse(JSON.stringify(user))
}

export function login (username) {
  	sessionStorage.setItem(CONSTANS.STORAGE_LOGIN, username)
  	return isLoggedIn()
}

export function logout (username) {
 	sessionStorage.removeItem(CONSTANS.STORAGE_LOGIN, username)
  	return !isLoggedIn()
}


