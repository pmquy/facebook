import { parseQuery } from "../../../utils/parseQuery"
class Api {

  get = async query =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups${parseQuery(query)}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  getPosts = async query =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups/posts${parseQuery(query)}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })


  create = async data =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups/create`, {
      method: 'POST',
      credentials: 'include',
      body: data
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  accept = async (group, user) =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups/${group}/accept`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ user: user }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  delete = async (group, user) =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups/${group}/delete`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ user: user }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  updateById = async (id, data) =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  getById = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups/${id}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  request = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups/${id}/request`, {
      credentials: 'include',
      method: 'POST'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  getMembersById = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups/${id}/members`, {
      credentials: 'include',
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  deleteById = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groups/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

}

export default new Api()