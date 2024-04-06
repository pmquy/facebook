import { useEffect, useRef } from "react";
import { RegisterForm } from "../features/account";

export default function () {
  const pRef1 = useRef(), cRef1 = useRef(), cRef2 = useRef()

  useEffect(() => {
    const ob1 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pRef1.current.classList.remove('opacity-0')
          cRef1.current.classList.remove('-translate-x-[1000px]')
          cRef2.current.classList.remove('translate-x-[1000px]')
        } else {
          pRef1.current.classList.add('opacity-0')
          cRef1.current.classList.add('-translate-x-[1000px]')
          cRef2.current.classList.add('translate-x-[1000px]')
        }
      })
    })
    if (pRef1.current) ob1.observe(pRef1.current)
  }, [])

  return <div style={{ backgroundImage: 'url(/login_bg.jpg)' }} className=" content-center bg-cover bg-center bg-no-repeat min-h-screen p-10">
    <div ref={pRef1} className="flex gap-20 rounded-lg opacity-0 overflow-x-hidden duration-1000 transition-all bg-white justify-center p-10 items-center">
      <img ref={cRef1} src="/login_side.png" className=" duration-1000 transition-all -translate-x-[1000px]" />
      <div ref={cRef2} className=" duration-1000 transition-all translate-x-[1000px]"><RegisterForm /></div>
    </div>
  </div>
}