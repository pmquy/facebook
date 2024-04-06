import React from "react"

export default React.forwardRef(({className , ...props}, ref) => {
  return <textarea ref={ref} {...props} className={`${className} min-h-24 outline-none resize-none p-2 rounded-lg`}></textarea>
})