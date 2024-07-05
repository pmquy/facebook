import { useQuery } from "react-query";
import FileApi from '../services/file'
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloseCircle, IoDownload } from "react-icons/io5";

export default function ({ id, className, needToNavigate = false, detail = false, ...props }) {
  const navigate = useNavigate()
  const location = useLocation()
  const query = useQuery({
    queryKey: ['file', id],
    queryFn: () => FileApi.getFileById(id).then(data => new File([new Uint8Array(data.data.data)], data.name, { type: data.type })),
  })

  if (query.isError || query.isLoading) return <img src="/vite.svg"></img>
  
  const type = query.data.type.split('/')[0]
  const src = URL.createObjectURL(query.data)

  const handleDowload = () => {
    const link = document.createElement('a')
    link.href = src
    link.download = query.data.name
    link.click()
  }

  return <div onClick={() => { if (needToNavigate && !detail) navigate('/files/' + id, { state: { url: location.pathname + location.search } }) }} className={`group relative max-w-max duration-200 transition-[filter] ${needToNavigate && !detail ? 'hover:brightness-75 cursor-pointer' : ''}`}>
    {needToNavigate && detail && <div className="flex gap-5 justify-center bg-teal">
      <IoDownload onClick={handleDowload} className={` w-10 h-10 btn-teal`} />
      <IoCloseCircle onClick={() => navigate(location?.state?.url ? location.state.url : '/')} className="w-10 h-10 btn-teal" />
    </div>}
    {type == 'video' ? <video controls={true} className={`${className}`} {...props} src={src} /> :
      type == 'image' ? <img className={`${className}`} {...props} src={src} /> :
        detail ? <embed className="w-screen h-screen" src={src} /> :
          <div className="py-5 px-10 rounded-lg bg-teal text-white">{query.data.name}</div>
    }
  </div>
}