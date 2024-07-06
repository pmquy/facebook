import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
const Context = createContext()
import UserApi from '../services/user'


function Loading() {
  return <div className=" bg-green-100 font-mono">
    <div className="flex min-h-screen  p-20 max-md:p-10 items-center gap-10 max-md:flex-col-reverse">
      <div className="grow flex gap-10 flex-col max-w-[500px]">
        <div className="text-5xl font-semibold ">Facebook Clone</div>
        <div className="">"We are currently in the process of loading all necessary services to ensure you have the best experience possible. This might take a moment, but rest assured, we are working hard behind the scenes to get everything up and running smoothly for you. Thank you for your patience!" </div>
        <a href="https://pmquy.github.io/" className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 select-none cursor-pointer  text-white rounded-md w-max border border-white">About me</a>
      </div>
      <div className="grow"></div>
      <img className="w-96 max-md:w-60" src="/loading.png" />
    </div>
    <div className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="animate-spin rounded-full h-12 w-12 border-2 border-b-transparent border-cyan-500"></div>
    </div>
  </div>
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const query = useQuery({
    queryFn: () => UserApi.getMe()
      .then(e => setUser(e))
      .catch(err => navigate('/login', { state: { url: location.pathname + location.search } })),
  })
  if (query.isLoading || query.isError) return <Loading />
  return <Context.Provider value={{ user: user, setUser: setUser }}>{children}</Context.Provider>
}

export const useUser = () => {
  const context = useContext(Context);
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}
