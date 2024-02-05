const getIndexFromPathName = pathName => {
  if(!pathName.indexOf('/')) {
    return 1
  }
  if(!pathName.indexOf('/watch')) {
    return 2
  }
  if(!pathName.indexOf('/market')) {
    return 3
  }
  if(!pathName.indexOf('/group')) {
    return 4
  }
  if(!pathName.indexOf('/game')) {
    return 5
  }
  return 1
}

export {getIndexFromPathName}