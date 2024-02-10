import { parseQuery } from "../../../utils/parseQuery"

class Api {

  get = async query =>
    fetch(`http://localhost:3000/likeposts${parseQuery(query)}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })


  create = async data =>
    fetch('http://localhost:3000/likeposts/create', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  delete = async data =>
    fetch(`http://localhost:3000/likeposts/`, {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

}

const LikeApi = new Api()
export default LikeApi