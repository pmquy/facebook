import { useEffect, useRef, useState } from "react";
import { Button, FileInput } from "./ui";
import { CiVideoOn, CiImageOn } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";

function Record({ handleVideo, setOpen }) {
  const [state, setState] = useState(0)
  const [currentStream, setCurrentStream] = useState()
  const [recorder, setRecorder] = useState()
  const [recordedStream, setRecordedStream] = useState()
  const currentRef = useRef()

  useEffect(() => {
    if (state == 0) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(s => {
        console.log(currentStream, s)
        if (currentStream) currentStream.getTracks().forEach(e => e.stop())
        currentRef.current.srcObject = s
        setCurrentStream(s)
      })
    }
  }, [state])

  const handleExit = () => {
    if (currentStream) {
      currentStream.getTracks().forEach(e => e.stop())
      currentRef.current.srcObject = null
    }
    setCurrentStream(null)
    setOpen(false)
  }

  const handleStart = () => {
    if (recordedStream) {
      const recorder = new MediaRecorder(currentStream)
      const chunks = []
      recorder.ondataavailable = e => chunks.push(e.data)
      recorder.onstop = () => setRecordedStream(new Blob(chunks, { type: 'video/webm' }))
      recorder.start()
      setRecorder(recorder)
      setState(1)
    }
  }

  const handlePause = () => {
    recorder.pause()
    setState(2)
  }

  const handleResume = () => {
    recorder.resume()
    setState(1)
  }

  const handleStop = () => {
    recorder.stop()
    setCurrentStream(null)
    setState(3)
  }

  const handleDone = () => {
    handleVideo(recordedStream)
    setCurrentStream(null)
    setOpen(false)
  }

  const handleCancel = () => {
    setCurrentStream(null)
    setRecordedStream(null)
    setState(0)
  }

  return <div className="flex flex-col gap-2">
    <div className="flex gap-2 justify-center">
      <Button className={'btn-teal dark:btn-grey'} onClick={handleExit}>Thoát</Button>
      {state == 0 && <Button className={'btn-teal dark:btn-grey'} onClick={handleStart}>Bắt đầu quay</Button>}
      {state != 0 && <Button className={'btn-teal dark:btn-grey'} onClick={handleCancel}>Hủy</Button>}
      {state == 1 && <Button className={'btn-teal dark:btn-grey'} onClick={handlePause}>Tạm dừng</Button>}
      {state == 2 && <Button className={'btn-teal dark:btn-grey'} onClick={handleResume}>Tiếp tục</Button>}
      {(state == 1 || state == 2) && <Button className={'btn-teal dark:btn-grey'} onClick={handleStop}>Dừng</Button>}
      {state == 3 && <Button className={'btn-teal dark:btn-grey'} onClick={handleDone}>Chọn video này</Button>}
    </div>
    <video className={`${currentStream ? 'block' : 'hidden'}`} ref={currentRef} autoPlay={true}></video>
    {state == 3 && recordedStream && <video src={URL.createObjectURL(recordedStream)} autoPlay={true} controls={true}></video>}
  </div>
}

function Capture({ setOpen, handleCapture }) {
  const [state, setState] = useState(0)
  const cameraRef = useRef()

  useEffect(() => {
    let stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(s => {
        stream = s
        cameraRef.current.srcObject = s
      })
    return () => {
      if (stream) {
        stream.getTracks().forEach(e => e.stop())
      }
    }
  }, [])

  const handleExit = () => {
    setOpen(false)
  }

  const takePhoto = () => {

  }

  const handleDone = () => {

  }

  const handleCancel = () => {

  }

  return <div className="flex flex-col gap-2">
    <div className="flex gap-2 justify-center">
      <Button className={'btn-teal dark:btn-grey'} onClick={handleExit}>Thoát</Button>
      {state == 0 && <Button className={'btn-teal dark:btn-grey'} onClick={takePhoto}>Chụp</Button>}
      {state == 1 && <Button className={'btn-teal dark:btn-grey'} onClick={handleDone}>Thêm</Button>}
      {state == 1 && <Button className={'btn-teal dark:btn-grey'} onClick={handleCancel}>Huỷ</Button>}
    </div>
    <video ref={cameraRef} autoPlay={true} />
  </div>
}

export default function ({ files, setFiles }) {

  const [openRecord, setOpenRecord] = useState(false)
  const [openCapture, setOpenCapture] = useState(false)

  return <div className="flex flex-col gap-5">
    <div className="flex gap-3 items-center">
      <div className="relative group w-max">
        <CiImageOn className=" w-6 h-6 bg-teal text-white rounded-lg p-1" />
        <div className="flex flex-col absolute bg-grey text-white z-10 max-h-0 top-0 left-0 -translate-y-full w-max group-hover:max-h-screen overflow-hidden duration-500 transition-all">
          <FileInput className={'px-5 py-1 hover:bg-teal'} onChange={e => setFiles(t => [...t, ...e.target.files])} accept={'image/*'}>Chọn ảnh</FileInput>
          <div onClick={() => setOpenCapture(true)} className="px-5 py-1 hover:bg-teal btn">Mở camera</div>
        </div>
      </div>

      <div className="relative group w-max">
        <CiVideoOn className=" w-6 h-6 bg-teal text-white rounded-lg p-1" />
        <div className="flex flex-col absolute bg-grey text-white z-10 max-h-0 top-0 left-0 -translate-y-full w-max group-hover:max-h-screen overflow-hidden duration-500 transition-all">
          <FileInput className={'px-5 py-1 hover:bg-teal'} onChange={e => setFiles(t => [...t, ...e.target.files])} accept={'video/*'}>Chọn video</FileInput>
          <div onClick={() => setOpenRecord(true)} className="px-5 py-1 hover:bg-teal btn">Mở camera</div>
        </div>
      </div>
      <FileInput className={'p-1 bg-teal text-white rounded-lg'} onChange={e => setFiles(t => [...t, ...e.target.files])}>Chọn file</FileInput>
    </div>
    {openCapture && <Capture setOpen={setOpenCapture} handleCapture={t => setFiles(a => [...a, t])} />}
    {openRecord && <Record setOpen={setOpenRecord} handleVideo={t => setFiles(a => [...a, t])} />}

    {files.map((e, i) => <div key={i} className=" relative rounded-lg max-w-max">
      <IoMdCloseCircle onClick={e => setFiles(t => t.filter((a, b) => b != i))} className="z-10 absolute top-0 right-0 h-8 w-8 btn-teal" />
      {e.type.split('/')[0] == 'image' ? <img src={URL.createObjectURL(e)} /> :
        e.type.split('/')[0] == 'video' ? <video key={i} src={URL.createObjectURL(e)} controls={true} /> :
          <div className="py-5 px-10 rounded-lg bg-teal text-white">{e.name}</div>}
    </div>)}
  </div>
}