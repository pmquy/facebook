import { IconButton, Tooltip , Button} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoMdCamera, IoMdClose, IoMdCloseCircle, IoMdVideocam } from "react-icons/io";
import { FileInput } from "./ui";

function Record({ handleVideo, setOpen }) {
  const [state, setState] = useState(0)
  const [recorder, setRecorder] = useState()
  const [currentStream, setCurrentStream] = useState()
  const [recordedStream, setRecordedStream] = useState()
  const currentRef = useRef()

  useEffect(() => {
    if (state == 0) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(s => {
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
    if (currentStream) {
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
      <Button color="warning" variant="outlined" onClick={handleExit}>Thoát</Button>
      {state == 0 && <Button variant="outlined" onClick={handleStart}>Bắt đầu quay</Button>}
      {state != 0 && <Button color="warning" variant="outlined" onClick={handleCancel}>Hủy</Button>}
      {state == 1 && <Button variant="outlined" onClick={handlePause}>Tạm dừng</Button>}
      {state == 2 && <Button variant="outlined" onClick={handleResume}>Tiếp tục</Button>}
      {(state == 1 || state == 2) && <Button variant="outlined" onClick={handleStop}>Dừng</Button>}
      {state == 3 && <Button variant="outlined" onClick={handleDone}>Chọn video này</Button>}
    </div>
    <video muted className={`${currentStream ? 'block' : 'hidden'}`} ref={currentRef} autoPlay={true}></video>
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
      <Button variant="outlined" color="error" onClick={handleExit}>Thoát</Button>
      {state == 0 && <Button variant="outlined" onClick={takePhoto}>Chụp</Button>}
      {state == 1 && <Button variant="outlined" onClick={handleDone}>Thêm</Button>}
      {state == 1 && <Button variant="outlined" onClick={handleCancel}>Huỷ</Button>}
    </div>
    <video muted ref={cameraRef} autoPlay={true} />
  </div>
}

export default function ({ files, setFiles }) {

  const [openRecord, setOpenRecord] = useState(false)
  const [openCapture, setOpenCapture] = useState(false)

  return <div className="flex flex-col gap-5">
    <div className="flex items-center">
      <Tooltip title="Capture image">
        <IconButton color="primary" onClick={() => setOpenCapture(true)}>
          <IoMdCamera />
        </IconButton>
      </Tooltip>  

      <Tooltip title="Record video">
        <IconButton color="primary" onClick={() => setOpenRecord(true)}>
          <IoMdVideocam />
        </IconButton>
      </Tooltip>

      <FileInput onChange={e => setFiles(t => [...t, ...e.target.files])}></FileInput>
    </div>
    {openCapture && <Capture setOpen={setOpenCapture} handleCapture={t => setFiles(a => [...a, t])} />}
    {openRecord && <Record setOpen={setOpenRecord} handleVideo={t => setFiles(a => [...a, t])} />}
    {
      files.map((e, i) => <div key={i} className=" relative rounded-md overflow-hidden w-full">
        <div className="top-2 right-2 absolute">
          <IconButton color="primary" onClick={() => setFiles(t => t.filter((_, index) => index !== i))}>
            <IoMdClose />
          </IconButton>
        </div>
        {e.type.split('/')[0] == 'image' ? <img key={e} src={URL.createObjectURL(e)} /> :
          e.type.split('/')[0] == 'video' ? <video key={i} src={URL.createObjectURL(e)} controls={true} /> :
            <div className="flex flex-col items-center">
              <FaFileAlt className="w-8 h-8" />
              <div >{e.name}</div>
            </div>}
      </div>)
    }
  </div>
}