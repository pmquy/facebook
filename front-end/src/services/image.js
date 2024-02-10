class Api {
  getImageById = id =>
    fetch(`http://localhost:3000/images/${id}`, {
      credentials: 'include'
    })
      .then(async res => {
        if (res.ok) return res.json()
        return res.json().then(res => { throw new Error(res.error.message) })
      })
}

export default new Api()