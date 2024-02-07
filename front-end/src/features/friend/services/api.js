import { parseQuery } from '../../../utils/parseQuery'

class Api {
  get = async query =>
    fetch(`http://localhost:3000/friends${query ? parseQuery(query) : ''}`, {
      credentials: 'include',
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  create = async id =>
    fetch(`http://localhost:3000/friends/${id}/create`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  accept = async id =>
    fetch(`http://localhost:3000/friends/${id}/accept`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  cancel = async id =>
    fetch(`http://localhost:3000/friends/${id}/cancel`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })
}

export default new Api()