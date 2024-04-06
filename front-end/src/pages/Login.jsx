import { useEffect, useRef } from "react";
import { LoginForm } from "../features/account";
export default function () {
  const pRef1 = useRef(), cRef1 = useRef(), cRef2 = useRef()
  const s1 = useRef(), s2 = useRef(), s3 = useRef()
  const menuRef = useRef()

  useEffect(() => {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          menuRef.current.classList.add('rotate-0')
          pRef1.current.classList.remove('opacity-0')
          cRef1.current.classList.remove('-translate-x-[1000px]')
          cRef2.current.classList.remove('translate-x-[1000px]')
        } else {
          menuRef.current.classList.remove('rotate-0')
          pRef1.current.classList.add('opacity-0')
          cRef1.current.classList.add('-translate-x-[1000px]')
          cRef2.current.classList.add('translate-x-[1000px]')
        }
      })
    }, { threshold: 0.1 }).observe(s1.current)
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          menuRef.current.classList.add('rotate-45')
        } else {
          menuRef.current.classList.remove('rotate-45')
        }
      })
    }, { threshold: 0.1 }).observe(s2.current)
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          menuRef.current.classList.add('rotate-90')
        } else {
          menuRef.current.classList.remove('rotate-90')
        }
      })
    }, { threshold: 0.1 }).observe(s3.current)
  }, [])

  return <div>
    <img ref={menuRef} src="/bg.jpg" className="w-32 h-32 rounded-full fixed z-10 top-1/2 -translate-x-1/2 left-32 transition-all duration-500" />
    <div style={{ background: 'linear-gradient(to left top, #222831, #00ADB5)' }}>
      <div ref={s1} className=" content-center bg-cover bg-center bg-no-repeat min-h-screen p-10">
        <div ref={pRef1} className="flex gap-20 max-xl:flex-col opacity-0 overflow-x-hidden duration-1000 transition-all card justify-center p-10 items-center">
          <img ref={cRef1} src="/login_side.png" className=" duration-1000 transition-all -translate-x-[1000px]" />
          <div ref={cRef2} className=" duration-1000 transition-all translate-x-[1000px]"><LoginForm /></div>
        </div>
      </div>
    </div>
    <div className=" h-[50vh] bg-cover   bg-no-repeat bg-center relative bg-[rgba(0,0,0,0.6)] bg-blend-darken" style={{ backgroundImage: 'url(/bg1.jpg)' }} >
      <p className=" text-white text-6xl border-white border-2 w-max p-5 rounded-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute">JUST SAY HI!</p>
    </div>
    <div style={{ background: 'linear-gradient(to left top, green, pink)' }}>
      <div ref={s2} className=" content-center bg-cover bg-center bg-no-repeat min-h-screen p-10"></div>
    </div>
    <div className=" min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(/bg1.jpg)' }} ></div>
    <div style={{ background: 'linear-gradient(to left top, black, red)' }}>
      <div ref={s3} className=" content-center bg-cover bg-center bg-no-repeat min-h-screen p-10"></div>
    </div>
  </div>
}