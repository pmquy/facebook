import React from "react"

export default React.forwardRef(({className , ...props}, ref) => {
  return <textarea ref={ref} {...props} className={`${className} min-h-24 resize-none border-2 p-1 rounded-lg`}></textarea>
})