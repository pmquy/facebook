import CommentApi from '../services/CommentApi'
import { useMutation } from "react-query"
import Comment from './Comment'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import { useSocket } from '../../../hooks/socket'
import { useUser } from '../../../hooks/user'

export default function Comments({ q, limit = 3 }) {
  const { user } = useUser()
  const pageRef = useRef(), hasMoreRef = useRef(true)
  const { socket } = useSocket()
  const [comments, setComments] = useState([])

  const mutation = useMutation({
    mutationFn: () => CommentApi.get({ page: pageRef.current, limit, q }),
    onSuccess: data => {
      hasMoreRef.current = data.hasMore
      pageRef.current += 1
      setComments(prev => [...prev, ...data.comments])
    }
  })

  useEffect(() => {
    CommentApi.get({ page: 0, limit, q })
      .then(data => {
        pageRef.current = 1
        hasMoreRef.current = data.hasMore
        setComments(data.comments)
      })
    const listener = data => {
      if (data.post == q.post && data.comment == q.comment) setComments(prev => user._id === data.user ? [data, ...prev] : [...prev, data])
    }
    socket.emit('join', 'post-' + q.post)
    socket.on('new_comment', listener)
    return () => {
      socket.off('new_comment', listener)
      socket.emit("leave", 'post-' + q.post)
    }
  }, [])

  return <div className={`flex flex-col gap-2`}>
    {comments.map(e => <div key={e._id}><Comment id={e._id} /></div>)}
    {hasMoreRef.current && <Button onClick={mutation.mutate}>
      <div className='text-xs font-semibold'>View more</div>
    </Button>}
  </div>
}