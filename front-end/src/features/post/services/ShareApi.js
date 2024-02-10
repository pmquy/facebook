import { parseQuery } from "../../../utils/parseQuery"
class Api {

  get = async query =>
    fetch(`http://localhost:3000/shareposts${parseQuery(query)}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })            
  

  create = async data =>
    fetch('http://localhost:3000/shareposts/create', {
      method: 'POST',
      credentials: 'include',
      body: data
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  updateById = async (id, data) =>
    fetch(`http://localhost:3000/shareposts/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  getById = async id =>
    fetch(`http://localhost:3000/shareposts/${id}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  deleteById = async id =>
    fetch(`http://localhost:3000/shareposts/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

}
const ShareApi = new Api()
export default ShareApi