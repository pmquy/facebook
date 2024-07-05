import { parseQuery } from "../../../utils/parseQuery"

class Api {

  login = async data =>
    fetch(`${import.meta.env.VITE_SERVER_URL}users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  create = async data =>
    fetch(`${import.meta.env.VITE_SERVER_URL}users/create`, {
      method: 'POST',
      credentials: 'include',
      body: data
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  update = async data =>
    fetch(`${import.meta.env.VITE_SERVER_URL}users`, {
      method: 'PUT',
      credentials: 'include',
      body: data
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  changePassword = async (id, data) =>
    fetch(`${import.meta.env.VITE_SERVER_URL}users/changePassword`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  getById = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}users/${id}`)
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  getGroups = async query =>
    fetch(`${import.meta.env.VITE_SERVER_URL}users/groups${parseQuery(query)}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

}

export default new Api()