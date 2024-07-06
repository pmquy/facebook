import { useQuery } from "react-query";
import FileApi from "../services/file";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoCloseCircle, IoDownload } from "react-icons/io5";

export default function FilePage() {
  const params = useParams()
  const location = useLocation()

  const query = useQuery({
    queryKey: ['file', params.id],
    queryFn: () => FileApi.getFileById(params.id),
  })

  if (query.isError || query.isLoading) return <img src="/vite.svg"></img>

  const type = query.data.type.split('/')[0]
  const src = query.data.url

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = src
    link.download = query.data.name
    link.click()
  }

  return <div className="fixed z-10 top-0 left-0 w-screen max-h-screen overflow-y-auto">
    <div className="flex gap-5 justify-center bg-primary text-onPrimary p-2">
      <IoDownload onClick={handleDownload} className={` w-8 h-8 p-1 rounded-full hover:bg-secondary`} />
      <Link to={location?.state?.url ? location.state.url : '/'}>
        <IoCloseCircle className="w-8 h-8 p-1 rounded-full hover:bg-secondary" />
      </Link>
    </div>
    {
      type == 'video' ? <video className="w-full h-full" controls={true} src={src} /> :
        type == 'image' ? <img className="w-full h-full" src={src} /> :
          <embed className="w-screen h-screen" src={src} />
    }
  </div>
}