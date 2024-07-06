import React from "react"

export default React.forwardRef(({className , ...props}, ref) => {
  return <input ref={ref} {...props} className={`${className} bg-transparent p-2 rounded-xl`}></input>
})