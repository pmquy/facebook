import { parseQuery } from "../../../utils/parseQuery"
class Api {

  get = async query =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groupchats${parseQuery(query)}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })            
  

  create = async data =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groupchats/create`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  updateById = async (id, data) =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groupchats/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(data),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

  deleteById = async id =>
    fetch(`${import.meta.env.VITE_SERVER_URL}groupchats/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })

}
const GroupChatApi = new Api()
export default GroupChatApi