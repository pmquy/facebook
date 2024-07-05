import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
const Context = createContext()
import UserApi from '../services/user'

export function UserProvider({children}) {
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const query = useQuery({
    queryFn: () => UserApi.getMe().then(e => setUser(e)).catch(err => navigate('/login', {state : {url : location.pathname + location.search}}))
  })
  if(query.isLoading) return <></>
  return <Context.Provider value={{user : user, setUser : setUser}}>{children}</Context.Provider>
}


export const useUser = () => {
  const context = useContext(Context);
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}
