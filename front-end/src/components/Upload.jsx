import { IoCloseCircle } from "react-icons/io5"
import { useRef, useState } from "react";
import { Button, FileInput } from "./ui";
import { CiVideoOn,CiImageOn } from "react-icons/ci";

function Record({ handleVideo, setOpen }) {
  const [state, setState] = useState(0)
  const [currentStream, setCurrentStream] = useState()
  const [recorder, setRecorder] = useState()
  const [recordedStream, setRecordedStream] = useState()
  const currentRef = useRef()
  const handleExit = () => {
    if (currentStream) {
      currentStream.getTracks().forEach(e => e.stop())
    }
    setOpen(false)
  }

  const handleStart = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        currentRef.current.srcObject = stream
        const recorder = new MediaRecorder(stream)
        const chunks = []
        recorder.ondataavailable = e => chunks.push(e.data)
        recorder.onstop = e => setRecordedStream(new Blob(chunks, { type: 'video/mp4' }))
        recorder.start()
        setRecorder(recorder)
        setState(1)
        setCurrentStream(stream)
      })
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
    if (currentStream) {
      currentStream.getTracks().forEach(e => e.stop())
    }
    currentRef.current.srcObject = null
    setCurrentStream(null)
    setState(3)
  }

  const handleDone = () => {
    handleVideo(recordedStream)
    setOpen(false)
  }

  const handleCancel = () => {
    if (currentStream) {
      currentStream.getTracks().forEach(e => e.stop())
    }
    currentRef.current.srcObject = null
    setState(0)
    setCurrentStream(null)
    setRecordedStream(null)
  }

  return <div className="flex flex-col gap-5">
    <Button onClick={handleExit}>Thoát</Button>
    {state == 0 && <Button onClick={handleStart}>Bắt đầu quay</Button>}
    {state != 0 && <Button onClick={handleCancel}>Hủy</Button>}
    {state == 1 && <Button onClick={handlePause}>Tạm dừng</Button>}
    {state == 2 && <Button onClick={handleResume}>Tiếp tục</Button>}
    {(state == 1 || state == 2) && <Button onClick={handleStop}>Dừng</Button>}
    {state == 3 && <Button onClick={handleDone}>Chọn video này</Button>}
    <video className={`${currentStream ? 'block' : 'hidden'}`} ref={currentRef} autoPlay={true}></video>
    {recordedStream && <video src={URL.createObjectURL(recordedStream)} autoPlay={true} controls={true}></video>}
  </div>
}

export default function ({ images, setImages, videos, setVideos, height, width }) {

  const [openRecord, setOpenRecord] = useState(false)
  const [openCapture, setOpenCapture] = useState(false)

  return <div className="flex flex-col gap-5">
    <div className="flex gap-3">
      <div className="relative group w-max">
        <CiImageOn className=" w-6 h-6 bg-teal text-white rounded-lg p-1"/>
        <div className="flex flex-col absolute bg-grey text-white z-10 max-h-0 top-0 left-0 -translate-y-full w-max group-hover:max-h-screen overflow-hidden duration-500 transition-all">
          <FileInput className={'px-5 py-1 hover:bg-teal'} ref={useRef()} onChange={e => setImages(t => [...t, ...e.target.files])} accept={'image/*'}>Chọn file</FileInput>
          <div className="px-5 py-1 hover:bg-teal">Mở camera</div>
        </div>
      </div>

      <div className="relative group w-max">
        <CiVideoOn className=" w-6 h-6 bg-teal text-white rounded-lg p-1" />
        <div className="flex flex-col absolute bg-grey text-white z-10 max-h-0 top-0 left-0 -translate-y-full w-max group-hover:max-h-screen overflow-hidden duration-500 transition-all">
          <FileInput className={'px-5 py-1 hover:bg-teal'} ref={useRef()} onChange={e => setVideos(t => [...t, ...e.target.files])} accept={'video/*'}>Chọn file</FileInput>
          <div onClick={() => setOpenRecord(true)} className="px-5 py-1 hover:bg-teal">Mở camera</div>
        </div>
      </div>
    </div>

    {images.map((e, i) => <div style={{ height: height, width: width }} className=" relative rounded-lg">
      <IoCloseCircle onClick={e => setImages(t => t.filter((a, b) => b != i))} className="z-10 absolute top-0 right-0 h-8 w-8" color="black" />
      <img key={i} src={URL.createObjectURL(e)} controls={true}></img>
    </div>)}
    {openRecord && <Record setOpen={setOpenRecord} handleVideo={t => setVideos(a => [...a, t])} />}
    {videos.map((e, i) => <div style={{ height: height, width: width }} className=" relative rounded-lg">
      <IoCloseCircle onClick={e => setVideos(t => t.filter((a, b) => b != i))} className="z-10 absolute top-0 right-0 h-8 w-8" color="black" />
      <video key={i} src={URL.createObjectURL(e)} controls={true}></video>
    </div>)}
  </div>
}