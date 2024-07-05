export default function ({setOpen, open}) {
  
  
  return <div onClick={() => setOpen(!open)} className=" btn relative max-w-max py-2">
    <div className={`w-12 h-4 ${open ? 'bg-grey' : 'bg-white'} rounded-3xl `}></div>
    <div className={`absolute w-6 h-6 rounded-full top-1/2 -translate-y-1/2 ${open ? 'left-8 bg-teal' : 'left-0 bg-grey'}`}></div>
  </div>
}