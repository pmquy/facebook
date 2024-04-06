const getIndexFromPathName = pathName => {
  if(pathName == '/') {
    return 1
  }
  if(pathName == '/watch') {
    return 2
  }
  if(pathName == '/market') {
    return 3
  }
  if(pathName == '/group') {
    return 4
  }
  if(pathName == '/carogames') {
    return 5
  }
  if(pathName == '/login' || pathName == '/register' || pathName == '/hello') {
    return 0
  }
  return -1
}

export {getIndexFromPathName}