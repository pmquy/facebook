import { memo, useEffect, useRef, useState } from "react";
import { useSocket } from "../../../hooks/socket";
import { useUser } from "../../../hooks/user";
import PostAPI from '../services/PostApi'
import { GrFormView } from "react-icons/gr";
import UserAccount from '../../../components/UserAccount'
import { Button } from "@mui/material";

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

const Message = memo(function ({ message }) {

  return <div className="text-white">
    {message.type === 'join' && <div className="flex gap-5 items-center">
      <UserAccount id={message.user} />
      <div>Đã tham gia</div>
    </div>}
    {message.type === 'comment' && <div className="flex gap-5 items-center">
      <div className="shrink-0">
      <UserAccount id={message.comment.user} />
      </div>
      <div className="max-w-full">{message.comment.content}</div>
    </div>}
  </div>
})

function Started({ post, detail = true }) {
  const { user } = useUser()
  const { socket } = useSocket()
  const videoRef = useRef()
  const role = post.user._id === user._id ? 'HOST' : 'CLIENT'
  const othersRef = useRef({})
  const streamRef = useRef()
  const pcRef = useRef()
  const [number, setNumber] = useState(0)
  const [messages, setMessages] = useState([])

  useEffect(() => {

    const handleJoin = (payload) => {
      setNumber(prev => prev + 1)
      setMessages(prev => [...prev, { type: 'join', user: payload.user }])
    }

    const handleLeave = (payload) => {
      setNumber(prev => prev - 1)
    }

    const host = () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => videoRef.current.srcObject = streamRef.current = stream)

      const listener = async (payload) => {

        switch (payload.type) {
          case 'join':
            const pc = new RTCPeerConnection(servers)
            othersRef.current[payload.socketID] = pc
            streamRef.current.getTracks().forEach(e => pc.addTrack(e, streamRef.current))
            pc.onicecandidate = event => event.candidate && socket.emit('live', { type: 'ice', group: payload.socketID, candidate: event.candidate })
            const offer = await pc.createOffer()
            await pc.setLocalDescription(offer)
            socket.emit('live', { type: 'offer', offer, group: payload.socketID, socketID: socket.id })
            handleJoin(payload)
            break
          case 'ice':
            othersRef.current[payload.socketID].addIceCandidate(new RTCIceCandidate(payload.candidate))
            break

          case 'answer':
            othersRef.current[payload.socketID].setRemoteDescription(payload.answer)
            break

          case 'leave': {
            othersRef.current[payload.socketID]?.close()
            delete othersRef.current[payload.socketID]
            handleLeave(payload)
            break
          }
        }
      }

      socket.on('live', listener)
      socket.emit('join', `live-${post._id}`, setNumber)
      return () => {
        socket.off('live', listener)
        socket.emit('leave', `live-${post._id}`)
        streamRef.current?.getTracks().forEach(e => e.stop())
        streamRef.current = null
        Object.values(othersRef.current).forEach(e => e.close())
        othersRef.current = {}
      }
    }

    const client = () => {
      videoRef.current.srcObject = streamRef.current = new MediaStream()

      const listener = async (payload) => {
        switch (payload.type) {
          case 'join':
            handleJoin(payload)
            break

          case 'offer':
            const pc = new RTCPeerConnection(servers)
            pcRef.current = pc
            pc.ontrack = event => event.streams[0] && event.streams[0].getTracks().forEach(track => {
              streamRef.current.addTrack(track)
            })
            pc.onicecandidate = event => event.candidate && socket.emit('live', { type: 'ice', group: payload.socketID, candidate: event.candidate, socketID: socket.id })
            await pc.setRemoteDescription(payload.offer)
            const answer = await pc.createAnswer()
            await pc.setLocalDescription(answer)
            socket.emit('live', { type: 'answer', group: payload.socketID, socketID: socket.id, answer: answer })
            break
          case 'ice':
            pcRef.current.addIceCandidate(new RTCIceCandidate(payload.candidate))
            break
          case 'leave':
            handleLeave(payload)
            break
        }
      }

      socket.on('live', listener)
      socket.emit('join', `live-${post._id}`, setNumber)
      socket.emit('live', { user: user._id, group: `live-${post._id}`, type: 'join', socketID: socket.id, user: user._id })
      return () => {
        socket.off('live', listener)
        socket.emit('leave', `live-${post._id}`)
        socket.emit('live', { socketID: socket.id, group: `live-${post._id}`, type: 'leave' })
        streamRef.current?.getTracks().forEach(e => e.stop())
        streamRef.current = null
        pcRef.current?.close()
        pcRef.current = null
      }
    }

    const clear2 = (function () {
      socket.emit('join', `post-${post._id}`)
      const listener = (comment) => setMessages(prev => [...prev, { type: 'comment', comment }])
      socket.on('new_comment', listener)
      return () => {
        socket.off('new_comment', listener)
        socket.emit('leave', `post-${post._id}`)
      }
    })()

    const clear1 = role === 'HOST' ? host() : client()

    return () => {
      clear1()
      clear2()
    }

  }, [])

  const handleStop = () => {
    const formData = new FormData()
    formData.append('status', "Stopped")
    streamRef.current.getTracks().forEach(e => e.stop())
    Object.values(othersRef.current).forEach(e => e.close())
    othersRef.current = {}
    PostAPI.updateById(post._id, formData)
  }

  return <div className="relative">
    <video className="w-full rounded-md" ref={videoRef} autoPlay muted={role === "HOST"} controls={role === "CLIENT"}></video>
    {!!messages.length && <div className="absolute bottom-0 max-h-[50%] overflow-y-auto w-full p-5 flex flex-col gap-2 bg-black/10  overscroll-contain">
      {messages.map((e, i) => <div key={i}><Message message={e} /></div>)}
    </div>}
    <div className="absolute top-2 left-2">
      <div className="flex gap-2">
        <div className=" p-2 rounded-lg font-semibold bg-red-600 text-onPrimary">Trực tiếp</div>
        <div className="p-2 rounded-lg font-semibold bg-black bg-opacity-60 text-white flex items-center">
          <GrFormView className="w-6 h-6" />
          <div>{number}</div>
        </div>
      </div>
    </div>
    {role === 'HOST' && detail && <div className="absolute bottom-5 left-1/2 -translate-x-1/2"><Button onClick={handleStop} variant="contained" color="error">End</Button></div>}

  </div>
}

function Stopped({ post }) {

  const videoRef = useRef()

  return <div className="relative">
    <video className="w-full m-auto" ref={videoRef} autoPlay controls></video>
    <div className="absolute top-2 left-2">
      <div className=" p-2 rounded-lg font-semibold bg-slate-600 text-onPrimary">Đã kết thúc</div>
    </div>
  </div>
}

export default function Live({ post, detail = true }) {
  if (post.status === "Started") return <Started detail={detail} post={post} />
  return <Stopped post={post} />
}