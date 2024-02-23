import { useEffect, useState } from "react"
import UserApi from "../services/user"
import { useNavigate } from "react-router-dom"

const useUser = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    UserApi.getMe()
      .then(user => setUser(user))
      .catch(() => navigate('/login'))      
      .finally(() => setIsLoading(false))
  }, [])
  return [user, setUser, isLoading]
}

export default useUser