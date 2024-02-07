const parseQuery = query => {
  let res = "?"
  for(let x in query) {
    res += x + '=' + query[x] + '&'
  }
  return res
}
export {parseQuery}