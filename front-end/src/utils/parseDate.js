const parseDate = str => {
  return new Date(str).toLocaleString('en-GB', {timeZone : 'Asia/Bangkok'})
}
export {parseDate}