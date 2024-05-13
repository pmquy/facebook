import { useContext, useEffect, useRef, useState } from "react"
import CommonContext from "../../../store/CommonContext"
import { MdVideoCall } from "react-icons/md"
import { SlCallEnd } from "react-icons/sl";
import { useQuery } from 'react-query'
import api from '../services/call'
import { toast } from 'react-toastify'
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

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
  const { socket, user, users } = useContext(CommonContext)
  const myVideoRef = useRef(), currentOtherRef = useRef(), ref = useRef()
  const [currentOther, setCurrentOther] = useState()

  const query = useQuery({
    queryKey: ['calls', { groupChat: id }],
    queryFn: () => api.get({ groupChat: id })
  })

  useEffect(() => {
    let listener;
    let stream;
    let temp_others = {}
    const solve = async () => {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      myVideoRef.current.srcObject = stream
      listener = async payload => {
        payload = JSON.parse(payload)
        switch (payload.type) {
          case 'join': {
            const pc = new RTCPeerConnection(servers)
            const remoteStream = new MediaStream()
            temp_others = { ...temp_others, [payload.user]: { pc: pc, stream: remoteStream, user: users.filter(e => e._id == payload.user)[0] } }
            stream.getTracks().forEach(track => pc.addTrack(track, stream))
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
            stream.getTracks().forEach(track => pc.addTrack(track, stream))
            pc.ontrack = event => event.streams[0] && event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track))
            pc.onicecandidate = event => event.candidate && socket.emit('call', JSON.stringify({ type: 'ice', group: 'call' + id, user: user._id, data: event.candidate, to: payload.user }))
            pc.setRemoteDescription(new RTCSessionDescription(payload.data))
              .then(() => pc.createAnswer())
              .then(answer => pc.setLocalDescription(answer))
              .then(() => socket.emit('call', JSON.stringify({ type: 'answer', group: 'call' + id, user: user._id, data: pc.localDescription, to: payload.user })))
              .then(() => setOthers({ ...temp_others }))
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
          case 'left': {
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
      solve()
    }
    return () => {
      document.body.style.overflow = 'auto'
      if (stream) {
        stream.getTracks().forEach(e => e.stop())
        socket.emit('call', JSON.stringify({ type: 'left', user: user._id, group: 'call' + id }))
        socket.off('call', listener)
        setOthers({})
      }
    }
  }, [open == 0, id])

  useEffect(() => {
    const a = Object.keys(others)
    a.forEach((e, i) => {
      ref.current.childNodes[i].childNodes[0].srcObject = others[e].stream
    })
    if (!a.length) {
      setCurrentOther(null)
      if (currentOtherRef.current) currentOtherRef.current.srcObject = null
    } else if (!others[currentOther] || !currentOther) {
      setCurrentOther(a[0])
      if (currentOtherRef.current) currentOtherRef.current.srcObject = others[a[0]].stream
    }
  }, [others, id])

  if (query.isError || query.isLoading) return <></>

  const handleCall = () => {
    if (query.data.length == 0 || query.data[query.data.length - 1].status == 1) {
      api.create({
        groupChat: id,
      })
        .then(() => setOpen(1))
        .catch(err => toast(err.message, { type: 'error' }))
    } else {
      setOpen(1)
    }
  }

  const handleClose = () => {
    if (Object.keys(others).length == 0) {
      api.deleteById(query.data[query.data.length - 1]._id)
        .then(() => setOpen(false))
        .catch(err => toast(err.message, { type: 'error' }))
    } else {
      setOpen(0)
    }
  }

  return <div>
    <div className={`${open ? '' : 'hidden'} fixed z-30 left-0 top-0 w-screen h-screen bg-black_trans`}></div>
    <div className={`${open ? '' : 'hidden'} card w-[90%] max-sm:w-screen h-[80%] max-sm:h-full overflow-y-auto overflow-x-hidden fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
      <div className={`${open == 1 ? 'translate-x-0' : '-translate-x-full'} transition-all duration-500 absolute top-0 left-0 w-full h-full p-2`}>
        <div className=" text-white absolute top-5 left-1/2 -translate-x-1/2">{others[currentOther]?.user?.firstName + ' ' + others[currentOther]?.user?.lastName}</div>
        <video className="object-cover h-full m-auto" ref={currentOtherRef} autoPlay={true} />
        <video className={`object-cover border-4 border-teal object-center absolute duration-500 transition-all ${currentOther ? 'top-2 right-2 h-[150px] w-[150px]' : 'top-0 left-0 w-full h-full'} `} ref={myVideoRef} autoPlay={true} />
        <FaChevronCircleRight onClick={() => setOpen(2)} className="w-10 h-10 btn-teal absolute top-1/2 -translate-y-1/2 right-5" />
        <SlCallEnd onClick={handleClose} className="w-10 h-10 btn-teal absolute bottom-5 left-1/2 -translate-x-1/2" />
      </div>
      <div className={`${open == 2 ? 'translate-x-0' : 'translate-x-full'} transition-all duration-500 absolute top-0 left-0 w-full h-full p-2`}>
        <div className=" grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }} ref={ref}>
        <FaChevronCircleLeft onClick={() => setOpen(1)} className="w-10 h-10 btn-teal absolute top-1/2 -translate-y-1/2 left-5" />
          {Object.keys(others).map(e =>
            <div className="flex flex-col items-center" key={e}>
              <video autoPlay={true} onClick={() => { setCurrentOther(e); setOpen(1) }} className="w-[300px] h-[300px] object-cover" />
              <div className=" text-black">{others[e].user.firstName + ' ' + others[e].user.lastName}</div>
            </div>
          )}
        </div>
      </div>
    </div>
    <MdVideoCall color={query.data.length == 0 || query.data[query.data.length - 1].status ? 'white' : 'aqua'} onClick={handleCall} className="w-8 h-8" />
  </div>
}