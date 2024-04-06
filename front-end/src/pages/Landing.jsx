import { useEffect, useRef } from "react";
export default function () {
  const s1 = useRef(), s2 = useRef(), s3 = useRef()
  const menuRef = useRef()

  useEffect(() => {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          menuRef.current.classList.add('rotate-0')
        } else {
          menuRef.current.classList.remove('rotate-0')
        }
      })
    }, {threshold : 0.1}).observe(s1.current)
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          menuRef.current.classList.add('rotate-45')
        } else {
          menuRef.current.classList.remove('rotate-45')
        }
      })
    }, {threshold : 0.1}).observe(s2.current)
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          menuRef.current.classList.add('rotate-90')
        } else {
          menuRef.current.classList.remove('rotate-90')
        }
      })
    }, {threshold : 0.1}).observe(s3.current)
  }, []) 

  return <div>
    <div ref={s1} style={{ backgroundImage: 'url(/login_bg.jpg)' }} className="content-center bg-cover bg-center bg-no-repeat min-h-screen p-10">
    </div>
    <div ref={s2} style={{ backgroundImage: 'url(/login_bg.jpg)' }} className="content-center bg-cover bg-center bg-no-repeat min-h-screen p-10">
    </div>
    <div ref={s3} style={{ backgroundImage: 'url(/login_bg.jpg)' }} className="content-center bg-cover bg-center bg-no-repeat min-h-screen p-10">
    </div>
    <img ref={menuRef} src="/bg.jpg" className="w-32 h-32 rounded-full fixed top-1/2 -translate-x-1/2 left-32 transition-all duration-500"/>
  </div>
}