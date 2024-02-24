import { parseQuery } from "../../../utils/parseQuery"

class Api {

  get = async query =>
    fetch(`${import.meta.env.VITE_SERVER_URL}likecomments${parseQuery(query)}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })


  create = async data =>
    fetch(`${import.meta.env.VITE_SERVER_URL}likecomments/create`, {
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
    fetch(`${import.meta.env.VITE_SERVER_URL}likecomments/`, {
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

const LikeCommentApi = new Api()
export default LikeCommentApi