import { parseQuery } from '../../../utils/parseQuery'

class Api {
  get = async query =>
    fetch(`${import.meta.env.VITE_SERVER_URL}friends${parseQuery(query)}`, {
      credentials: 'include',
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  create = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}friends/${id}/create`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  accept = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}friends/${id}/accept`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  cancel = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}friends/${id}/cancel`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })
}

export default new Api()