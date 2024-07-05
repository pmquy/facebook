import { useContext, useEffect, useRef, useState } from "react"
import CommonContext from "../../../store/CommonContext"
import { MdVideoCall } from "react-icons/md"
import { SlCallEnd } from "react-icons/sl"
import { useQuery } from 'react-query'
import api from '../services/message'
import { toast } from 'react-toastify'
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa"
import { PiScreencastBold } from "react-icons/pi"
import { useSocket } from "../../../hooks/socket"
import { useUser } from "../../../hooks/user"
import { FaMicrophone } from "react-icons/fa";
import { PiVideoCameraFill } from "react-icons/pi";

const servers = {
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:standard.relay.metered.ca:80",
      username: "5177322f9615b2eb2249488c",
      credential: "k1G5No+LjyPmRKK4",
    },
    {
      urls: "turn:standard.relay.metered.ca:80?transport=tcp",
      username: "5177322f9615b2eb2249488c",
      credential: "k1G5No+LjyPmRKK4",
    },
    {
      urls: "turn:standard.relay.metered.ca:443",
      username: "5177322f9615b2eb2249488c",
      credential: "k1G5No+LjyPmRKK4",
    },
    {
      urls: "turns:standard.relay.metered.ca:443?transport=tcp",
      username: "5177322f9615b2eb2249488c",
      credential: "k1G5No+LjyPmRKK4",
    },
  ],
}

export default function ({ id }) {
  const [open, setOpen] = useState(false)
  const [others, setOthers] = useState({})
  const { users, headerRef } = useContext(CommonContext)
  const { user } = useUser()
  const { socket } = useSocket()
  const myVideoRef = useRef(), currentOtherRef = useRef(), ref = useRef(), streamRef = useRef()
  const [currentOther, setCurrentOther] = useState()
  const [isSharing, setIsSharing] = useState(false)
  const [withVideo, setWithVideo] = useState(true)
  const [withAudio, setWithAudio] = useState(true)

  useEffect(() => {
    let listener
    let temp_others = {}
    const solve = async () => {
      myVideoRef.current.srcObject = streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

      listener = payload => {
        payload = JSON.parse(payload)
        switch (payload.type) {
          case 'join': {
            const pc = new RTCPeerConnection(servers)
            const remoteStream = new MediaStream()
            temp_others = { ...temp_others, [payload.user]: { pc: pc, stream: remoteStream, user: users.filter(e => e._id == payload.user)[0] } }
            streamRef.current.getTracks().forEach(track => pc.addTrack(track, streamRef.current))
            pc.ontrack = event => event.streams[0] && event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track))
            pc.onicecandidate = event => event.candidate && socket.emit('call', JSON.stringify({ type: 'ice', group: 'call' + id, user: user._id, data: event.candidate, to: payload.user }))
            pc.createOffer()
              .then(offer => pc.setLocalDescription(offer))
              .then(() => socket.emit('call', JSON.stringify({ type: 'offer', group: 'call' + id, user: user._id, data: pc.localDescription, to: payload.user })))
            break
          }
          case 'offer': {
            if (payload.to != user._id) break
            const pc = new RTCPeerConnection(servers)
            const remoteStream = new MediaStream()
            temp_others = { ...temp_others, [payload.user]: { pc: pc, stream: remoteStream, user: users.filter(e => e._id == payload.user)[0] } }
            streamRef.current.getTracks().forEach(track => pc.addTrack(track, streamRef.current))
            pc.ontrack = event => event.streams[0] && event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track))
            pc.onicecandidate = event => event.candidate && socket.emit('call', JSON.stringify({ type: 'ice', group: 'call' + id, user: user._id, data: event.candidate, to: payload.user }))
            pc.setRemoteDescription(new RTCSessionDescription(payload.data))
              .then(() => pc.createAnswer())
              .then(answer => pc.setLocalDescription(answer))
              .then(() => {
                socket.emit('call', JSON.stringify({ type: 'answer', group: 'call' + id, user: user._id, data: pc.localDescription, to: payload.user }))
                setOthers({ ...temp_others })
              })
            break
          }
          case 'answer': {
            if (payload.to != user._id) break
            temp_others[payload.user].pc.setRemoteDescription(new RTCSessionDescription(payload.data))
            setOthers({ ...temp_others })
            break
          }
          case 'ice': {
            if (user._id != payload.to) break
            temp_others[payload.user].pc.addIceCandidate(new RTCIceCandidate(payload.data))
            break
          }
          case 'leave': {
            delete temp_others[payload.user]
            setOthers({ ...temp_others })
            break
          }
        }
      }
      socket.on('call', listener)
      socket.emit('call', JSON.stringify({ type: 'join', user: user._id, group: 'call' + id }))
    }
    if (open) {
      document.body.style.overflow = 'hidden'
      headerRef.current.style['z-index'] = 5
      solve()
    }
    return () => {
      document.body.style.overflow = 'auto'
      headerRef.current.style['z-index'] = 10
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(e => e.stop())
        socket.emit('call', JSON.stringify({ type: 'leave', user: user._id, group: 'call' + id }))
        socket.off('call', listener)
        setOthers({})
        setIsSharing(false)
      }
    }
  }, [open == 0, id])

  useEffect(() => {
    const a = Object.keys(others)
    a.forEach((e, i) => ref.current.childNodes[i].childNodes[0].srcObject = others[e].stream)
    if (!a.length) {
      setCurrentOther(null)
      if (currentOtherRef.current) currentOtherRef.current.srcObject = null
    } else if (!currentOther) {
      setCurrentOther(a[0])
      if (currentOtherRef.current) currentOtherRef.current.srcObject = others[a[0]].stream
    }
  }, [others, id])

  const query = useQuery({
    queryKey: ['messages', { groupChat: id, type: 'call' }],
    queryFn: () => api.get({ groupChat: id, type: 'call' })
  }, [id])

  if (query.isError || query.isLoading) return <></>

  const handleCall = () => {
    if (!query.data.length || query.data[query.data.length - 1].status == "ended") {
      const data = new FormData()
      data.append('type', 'call')
      data.append('groupChat', id)
      data.append('status', "started")
      api.create(data)
        .then(() => setOpen(1))
        .catch(err => toast(err.message, { type: 'error' }))
    } else {
      setOpen(1)
    }
  }

  const handleClose = () => {
    if (Object.keys(others).length == 0) {
      const data = new FormData()
      data.append('status', 'ended')
      api.updateById(query.data[query.data.length - 1]._id, data)
        .then(() => setOpen(false))
        .catch(err => toast(err.message, { type: 'error' }))
    } else {
      setOpen(0)
    }
  }

  const handleShareScreen = async () => {
    try {
      streamRef.current.getVideoTracks()[0].stop()
      streamRef.current.removeTrack(streamRef.current.getVideoTracks()[0])
      const stream = isSharing ? await navigator.mediaDevices.getUserMedia({ video: true }) : await navigator.mediaDevices.getDisplayMedia({ video: true })
      const videoTrack = stream.getTracks()[0]
      streamRef.current.addTrack(videoTrack)
      Object.keys(others).forEach(peerId => {
        const pc = others[peerId].pc
        let videoSender = pc.getSenders().find(sender => sender.track?.kind === 'video')
        if (videoSender) videoSender.replaceTrack(videoTrack)
      })

      setIsSharing(!isSharing)

    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  const handleWithAudio = async () => {
    try {
      if (withAudio) {
        streamRef.current.getAudioTracks()[0].stop()
        streamRef.current.removeTrack(streamRef.current.getAudioTracks()[0])
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const audioTrack = stream.getTracks()[0]
        streamRef.current.addTrack(audioTrack)
        Object.keys(others).forEach(peerId => {
          const pc = others[peerId].pc
          let audioSender = pc.getSenders().find(sender => sender.track?.kind === 'video')
          if (audioSender) audioSender.replaceTrack(audioTrack)
        })
      }
      setWithAudio(!withAudio)

    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  const handleWithVideo = async () => {
    try {
      if (withVideo) {
        streamRef.current.getVideoTracks()[0].stop()
        streamRef.current.removeTrack(streamRef.current.getVideoTracks()[0])
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        const videoTrack = stream.getTracks()[0]
        streamRef.current.addTrack(videoTrack)
        Object.keys(others).forEach(peerId => {
          const pc = others[peerId].pc
          let videoSender = pc.getSenders().find(sender => sender.track?.kind === 'video')
          if (videoSender) videoSender.replaceTrack(videoTrack)
        })
      }
      setWithVideo(!withVideo)

    } catch (error) {
      toast(err.message, { type: 'error' })
    }
  }


  return <div>
    <div className={`${open ? '' : 'hidden'} fixed z-10 left-0 top-0 w-screen h-screen bg-black_trans`}></div>
    <div className={`${open ? '' : 'hidden'} card dark:card-black w-[80%] h-[80%] max-sm:w-screen max-sm:h-screen overflow-hidden fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
      <div className={`${open == 1 ? 'translate-x-0' : '-translate-x-full'} transition-all duration-500 absolute top-0 left-0 w-full h-full text-white`}>
        <video className="object-cover h-full m-auto" ref={currentOtherRef} autoPlay={true} />
        <video className={`object-cover object-center absolute duration-500 transition-all  ${currentOther ? 'right-0 top-0 border-4 border-teal h-[150px] w-[150px]' : 'top-0 left-1/2 -translate-x-1/2 h-full'} `} ref={myVideoRef} autoPlay={true} />
        <FaChevronCircleRight onClick={() => setOpen(2)} className="w-10 h-10 btn-teal dark:btn-grey absolute top-1/2 -translate-y-1/2 right-5" />
        {currentOther && <div className=" text-white absolute bottom-20 left-1/2 -translate-x-1/2">{others[currentOther]?.user?.firstName + ' ' + others[currentOther]?.user?.lastName}</div>}
        <div className="flex gap-5 absolute bottom-5 left-1/2 -translate-x-1/2">
          <SlCallEnd onClick={handleClose} className="w-10 h-10 btn-teal-n" />
          <PiVideoCameraFill onClick={handleWithVideo} className={`w-10 h-10 ${withVideo ? 'btn-teal-n' : 'btn-black-n'}`} />
          <PiScreencastBold onClick={handleShareScreen} className={`w-10 h-10 ${isSharing ? 'btn-teal-n' : 'btn-black-n'}`} />
          <FaMicrophone onClick={handleWithAudio} className={`w-10 h-10 ${withAudio ? 'btn-teal-n' : 'btn-black-n'}`} />
        </div>
      </div>
      <div className={`${open == 2 ? 'translate-x-0' : 'translate-x-full'} transition-all duration-500 absolute top-0 left-0 w-full h-full text-white`}>
        <FaChevronCircleLeft onClick={() => setOpen(1)} className="w-10 h-10 btn-teal dark:btn-grey absolute top-1/2 -translate-y-1/2 left-5" />
        <div className=" grid gap-5 overflow-y-auto max-h-full p-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }} ref={ref}>
          {Object.keys(others).map(e => <div onClick={() => { setCurrentOther(e); setOpen(1) }} className="flex flex-col gap-2 overflow-hidden items-center m-auto w-max bg-grey rounded-lg cursor-pointer" key={e}>
            <video autoPlay={true} className="w-[200px] h-[200px] object-cover" />
            <div className="">{others[e].user.firstName + ' ' + others[e].user.lastName}</div>
          </div>)}
        </div>
      </div>
    </div>

    <MdVideoCall color={!query.data.length || query.data[query.data.length - 1].status == "ended" ? 'white' : '#222831'} onClick={handleCall} className="w-8 h-8" />
  </div>
}