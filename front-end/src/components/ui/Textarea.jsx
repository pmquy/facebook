import React from "react"

export default React.forwardRef(({className , ...props}, ref) => {
  return <textarea ref={ref} {...props} className={`${className} bg-transparent outline-hidden resize-none p-2 rounded-lg`}></textarea>
})