import { parseQuery } from "../utils/parseQuery"

class Api {
  getMe = async () =>
    fetch(`${import.meta.env.VITE_SERVER_URL}users/me`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  get = async query =>
    fetch(`${import.meta.env.VITE_SERVER_URL}users${parseQuery(query)}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })  
}

export default new Api()