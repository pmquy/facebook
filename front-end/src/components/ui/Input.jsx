import React from "react"

export default React.forwardRef(({className , ...props}, ref) => {
  return <input ref={ref} {...props} className={`${className} bg-[rgb(255,255,255,0.4)] p-2 rounded-xl outline-none`}></input>
})