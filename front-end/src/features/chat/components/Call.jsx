import { useContext, useEffect, useRef, useState } from "react"
import CommonContext from "../../../store/CommonContext"
import { MdVideoCall } from "react-icons/md"
import { SlCallEnd } from "react-icons/sl";
import { useQuery } from 'react-query'
import api from '../services/call'
import { toast } from 'react-toastify'

const servers = {
  iceServers: [
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:asia.relay.metered.ca:80",
        username: "5177322f9615b2eb2249488c",
        credential: "k1G5No+LjyPmRKK4",
      },
      {
        urls: "turn:asia.relay.metered.ca:80?transport=tcp",
        username: "5177322f9615b2eb2249488c",
        credential: "k1G5No+LjyPmRKK4",
      },
      {
        urls: "turn:asia.relay.metered.ca:443",
        username: "5177322f9615b2eb2249488c",
        credential: "k1G5No+LjyPmRKK4",
      },
      {
        urls: "turns:asia.relay.metered.ca:443?transport=tcp",
        username: "5177322f9615b2eb2249488c",
        credential: "k1G5No+LjyPmRKK4",
      },
  ],
}

export default function ({ id }) {
  const [open, setOpen] = useState(false)
  const [others, setOthers] = useState({})
  const { socket, user, users } = useContext(CommonContext)
  const myVideoRef = useRef(), ref = useRef()
  const query = useQuery({
    queryKey: ['calls', { groupChat: id }],
    queryFn: () => api.get({ groupChat: id })
  })

  useEffect(() => {
    console.log(others)
    Object.keys(others).forEach((e, i) => {
      ref.current.childNodes[i + 1].childNodes[0].srcObject = others[e].stream
    })
  }, [others])

  useEffect(() => {
    let listener;
    let stream;
    let temp_others = {}
    const solve = async () => {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      myVideoRef.current.srcObject = stream
      listener = async payload => {
        payload = JSON.parse(payload)
        console.log(payload)
        switch (payload.type) {
          case 'join': {
            const pc = new RTCPeerConnection(servers)
            const remoteStream = new MediaStream()
            temp_others = { ...temp_others, [payload.user]: { pc: pc, stream: remoteStream } }
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
            temp_others = { ...temp_others, [payload.user]: { pc: pc, stream: remoteStream } }
            stream.getTracks().forEach(track => pc.addTrack(track, stream))
            pc.ontrack = event => event.streams[0] && event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track))
            pc.onicecandidate = event => event.candidate && socket.emit('call', JSON.stringify({ type: 'ice', group: 'call' + id, user: user._id, data: event.candidate, to: payload.user }))
            pc.setRemoteDescription(new RTCSessionDescription(payload.data))
              .then(() => pc.createAnswer())
              .then(answer => pc.setLocalDescription(answer))
              .then(() => socket.emit('call', JSON.stringify({ type: 'answer', group: 'call' + id, user: user._id, data: pc.localDescription, to: payload.user })))
              .then(() => setOthers({...temp_others}))
            break
          }
          case 'answer': {
            if (payload.to != user._id) break
            temp_others[payload.user].pc.setRemoteDescription(new RTCSessionDescription(payload.data))
            setOthers({...temp_others})
            break
          }
          case 'ice': {
            if (user._id != payload.to) break
            temp_others[payload.user].pc.addIceCandidate(new RTCIceCandidate(payload.data))
            break
          }
          case 'left': {
            delete temp_others[payload.user]
            setOthers({...temp_others})
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
  }, [open])

  const handleCall = () => {
    if (query.data.length == 0 || query.data[query.data.length - 1].status == 1) {
      api.create({
        groupChat: id,
      })
        .then(() => setOpen(true))
        .catch(err => toast(err.message, { type: 'error' }))
    } else {
      setOpen(true)
    }
  }

  const handleClose = () => {
    if (Object.keys(others).length == 0) {
      api.deleteById(query.data[query.data.length - 1]._id)
        .then(() => setOpen(false))
        .catch(err => toast(err.message, { type: 'error' }))
    } else {
      setOpen(false)
    }
  }
  if (query.isError || query.isLoading) return <></>
  return <div>
    {open && <div className={` fixed z-30 left-0 top-0 w-screen h-screen bg-black_trans`}></div>}
    {open && <div ref={ref} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }} className="card p-5 grid gap-5 w-[90%] max-sm:w-screen max-sm:min-h-screen max-h-[90%] overflow-auto fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center gap-2">
        <video className=" w-[300px] h-[300px] max-sm:w-full max-sm:h-full object-cover" ref={myVideoRef} autoPlay={true} />
        <div className="flex justify-between gap-5 items-center">
          <div className="text-black">Bạn</div>
          <div onClick={handleClose} className="p-2 btn-1 rounded-full">
            <SlCallEnd className="w-4 h-4" />
          </div>
        </div>
      </div>
      {Object.keys(others).map(e => <div key={e} className="flex flex-col items-center gap-2">
        <video className="w-[300px] h-[300px] max-sm:w-full max-sm:h-full object-cover" autoPlay={true} />
        <div className="text-black">{users.filter(t => t._id == e)[0].firstName} {users.filter(t => t._id == e)[0].lastName}</div>
      </div>)}
    </div>}
    <MdVideoCall color={query.data.length == 0 || query.data[query.data.length - 1].status ? 'white' : 'aqua'} onClick={handleCall} className="w-8 h-8" />
  </div>
}