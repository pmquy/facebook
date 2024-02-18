const parseQuery = query => {
  let res = "?"
  if (query)
    for (let x in query) {
      res += x + '=' + query[x] + '&'
    }
  return res
}
export { parseQuery }