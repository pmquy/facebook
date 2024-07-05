import React, { useRef } from "react"
import Button from './Button'

export default ({children,className , ...props}) => {    
  const ref = useRef()
  return <div>
    <input type="file" multiple={true} hidden ref={ref} {...props}></input>
    <Button className={`${className} w-full`} onClick={() => ref.current.click()}>{children ? children : 'Thêm ảnh'}</Button>
  </div>
}