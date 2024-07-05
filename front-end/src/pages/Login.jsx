import { useEffect, useRef } from "react";
import { LoginForm } from "../features/account";

export default function Login() {
  const ref = useRef()

  useEffect(() => {
    if(ref.current) {
      ref.current.classList.remove('-translate-y-[1000px]')
      ref.current.classList.add('-translate-y-1/2')
    }
  },[])

  return <div className=" relative w-screen h-screen ">
    <img className="absolute top-0 left-0 w-full h-full object-cover" src="/login_img.jpg"></img>
    <div ref={ref} style={{ background: 'linear-gradient(to left top, rgb(255,255,255,0.2), rgb(0,173,181,0.2))' }} className=" bg-teal absolute top-1/2 transition-[transform] -translate-y-[1000px] duration-500 left-1/2 -translate-x-1/2 backdrop-blur-sm p-5 rounded-lg text-black max-h-full overflow-auto max-sm:w-full"><LoginForm/></div>
  </div>
}