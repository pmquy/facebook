import { parseQuery } from "../../../utils/parseQuery"
class Api {

  get = async query =>
    fetch(`${import.meta.env.VITE_SERVER_URL}posts${parseQuery(query)}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })            
  

  create = async data =>
    fetch(`${import.meta.env.VITE_SERVER_URL}posts/create`, {
      method: 'POST',
      credentials: 'include',
      body: data
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  updateById = async (id, data) =>
    fetch(`${import.meta.env.VITE_SERVER_URL}posts/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  getById = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}posts/${id}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  deleteById = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}posts/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

}

export default new Api()