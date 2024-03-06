class Api {
  get = () =>
    fetch(`${import.meta.env.VITE_SERVER_URL}notifications`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })
  deleteById = (id) =>
    fetch(`${import.meta.env.VITE_SERVER_URL}notifications/${id}`, {
      credentials: 'include',
      method : 'DELETE'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })
}

export default new Api()