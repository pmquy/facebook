import React from "react"

export default React.forwardRef(({className , ...props}, ref) => {
  return <input ref={ref} {...props} className={`${className} border-2 p-1 rounded-lg`}></input>
})