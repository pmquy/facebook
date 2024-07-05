// just closure

const debounce = (callback, time) => {
  let id
  return (...args) => {
    if(id) clearTimeout(id)
    id = setTimeout(() => callback.apply(null, args), time)
  }
}


export default debounce