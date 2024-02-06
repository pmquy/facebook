import {useQuery} from 'react-query'
import api from '../services/api'
import { useState } from 'react'

export default function() {
  const [user, setUser] = useState()
  const query = useQuery({
    queryKey : ['me'],
    queryFn : () => api.getMe().then(user => setUser(user)),
  })
  return [user, setUser]
}