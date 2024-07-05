import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Button, Input, Textarea } from "../components/ui"
import { MdDelete } from "react-icons/md";

const NoteContext = createContext()

function Note({ index, i }) {

  const { subjects, setSubjects } = useContext(NoteContext)
  const handleChange = (e) => {
    subjects[index].items[i].content = e.target.value
    const t = [...subjects]
    setSubjects(t)
  }

  const handleDragStart = e => {
    console.log(e)
  }

  const handleDragEnd = e => {
    console.log(e)
  }

  return <Textarea onChange={handleChange} className=" bg-teal" defaultValue={subjects[index].items[i].content} />
}


function Subject({ index }) {
  const { subjects, setSubjects} = useContext(NoteContext)
  const ref = useRef()


  useEffect(() => {
    let pos1, pos2, offsetTop = subjects[index].offsetTop, offsetLeft = subjects[index].offsetLeft, canMove = false
    ref.current.style.left = offsetLeft + 'px'
    ref.current.style.top = offsetTop + 'px'
    ref.current.style['z-index'] = 0

    const handleMouseDown = e => {
      canMove = true
      pos1 = e.pageX
      pos2 = e.pageY
      ref.current.style['z-index'] = parseInt(ref.current.style['z-index']) + 1
    }

    const handleMouseMove = e => {
      if (!canMove) return
      ref.current.style.left = `${e.pageX - pos1 + offsetLeft}px`
      ref.current.style.top = `${e.pageY - pos2 + offsetTop}px`
    }

    const handleMouseUp = e => {
      if (canMove) {
        ref.current.style['z-index'] = 0
        canMove = false
        offsetLeft += e.pageX - pos1
        offsetTop += e.pageY - pos2
        subjects[index].offsetLeft = offsetLeft
        subjects[index].offsetTop = offsetTop
      }
    }

    if (ref.current) {
      ref.current.onmousedown = handleMouseDown
      ref.current.onmouseup = handleMouseUp
      ref.current.onmouseleave = handleMouseUp
      ref.current.onmousemove = handleMouseMove
    }
  }, [])

  const handleAddNote = () => {
    subjects[index].items.push({ content: 'Javascript' })
    const t = [...subjects]
    setSubjects(t)
  }
  const handleChange = e => {
    subjects[index].name = e.target.value
    const t = [...subjects]
    setSubjects(t)
  }
  const handleDelete = () => {
    subjects.splice(index, 1)
    setSubjects([...subjects])
  }

  return <div ref={ref} className=" absolute top-0 left-0 cursor-pointer rounded-lg card-black h-[500px] overflow-y-auto w-96">
    <div className="sticky top-0 bg-black py-2">
      <Input onChange={handleChange} className="w-full px-20 uppercase bg-black" defaultValue={subjects[index].name} />
      <div className="flex gap-2 justify-center items-center">
        <Button className={'rounded-full bg-teal w-6 h-6'} onClick={handleAddNote}>+</Button>
        <MdDelete onClick={handleDelete} className="w-6 h-6" color="red" />
      </div>
    </div>
    <div className="p-5 flex flex-col gap-2 ">
      {subjects[index].items.map((e, i) => <Note i={i} index={index} content={e.content} />)}
    </div>
  </div>
}

export default function NotePage() {
  const [subjects, setSubjects] = useState(localStorage.getItem('subjects') ? JSON.parse(localStorage.getItem('subjects')) : [])

  const handleAddSubject = () => {
    subjects.push({ name: 'Untitled', items: [], offsetLeft: 300, offsetTop: 300 })
    setSubjects([...subjects])
  }

  useEffect(() => {
    const fn = () => localStorage.setItem('subjects', JSON.stringify(subjects))
    window.addEventListener('beforeunload', fn)
    return () => window.removeEventListener('beforeunload', fn)
  }, [])

  return <NoteContext.Provider value={{ subjects, setSubjects}}>
    <div className="fixed left-0 top-0 w-full h-full p-20 overflow-y-auto">
      {subjects.map((e, i) => <div><Subject index={i} /></div>)}
      <Button className={'btn-teal h-max'} onClick={handleAddSubject}>Add Subject</Button>
    </div>
  </NoteContext.Provider>
};
