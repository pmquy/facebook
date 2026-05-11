const parseDate = str => {
  return new Date(str).toLocaleString('vi-Vi')
}

const getDiff = ( date, from = Date.now(),) => {
  const diff = from - new Date(date)
  if (diff < 5000) return 'Now'
  if (diff < 60000) return `${Math.floor(diff / 1000)} secs`
  if (diff < 3600000) return `${Math.floor(diff / 60000)} mins`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)} days`
  if (diff < 2592000000) return `${Math.floor(diff / 604800000)} weeks`
  if (diff < 31536000000) return `${Math.floor(diff / 2592000000)} months`
  return `${Math.floor(diff / 31536000000)} years`
}

const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-GB', { year:"numeric", month:"2-digit", day:"2-digit" })
}

export {parseDate, getDiff, formatDate}