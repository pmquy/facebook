import {forwardRef, useRef, useState} from 'react';
import { FaCheckSquare } from "react-icons/fa";

export default forwardRef(function Checkbox({checked, onChange, ...props}, ref) {
  
  const [state, setState] = useState(checked)

  const moveRef = useRef()

  const handleOnChange = () => {
    onChange && onChange(!state)
    ref.current.checked = !state
    setState(!state)
  }

  const onMouseDown = (e) => {
    e.preventDefault()
    moveRef.current.style.width = '40px'
    moveRef.current.style.height = '40px'
    moveRef.current.style.opacity= 1
  }

  const onMouseUp = (e) => {
    moveRef.current.style.width = '0px'
    moveRef.current.style.height = '0px'
    moveRef.current.style.opacity= 0
    e.preventDefault()
  }
  
  return <div onClick={handleOnChange} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className='relative group btn'>
    <FaCheckSquare className={`w-6 h-6 ${state ? ' text-primary': 'text-transparent border-2'} rounded-md overflow-hidden border-primary`}/>
    <input type="checkbox" ref={ref} defaultValue={checked} className="hidden" {...props}/>
    <div style={{transitionProperty: 'width, height'}} ref={moveRef} className='absolute duration-500 rounded-full bg-primary bg-opacity-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'></div>
    <div className='absolute hidden group-hover:block w-10 h-10 rounded-full bg-primary bg-opacity-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'></div>
  </div>
})