import { useQuery } from "react-query";
import ImageApi from '../services/image'
import { MdOutlineZoomOutMap } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ({ id, className, needToNavigate = true, ...props }) {
  const navigate = useNavigate()
  const query = useQuery({
    queryKey: ['image', id],
    queryFn: () => ImageApi.getImageById(id).then(data => {
      const blob = new Blob([new Uint8Array(data.data.data)], { type: 'image/jpg' })
      return URL.createObjectURL(blob)
    })
  })
  if (query.isError || query.isLoading) return <img className={className} {...props} src="/bg.jpg"></img>

  return <div className={`group relative max-w-max`}>
    <img onClick={() => setOpen(true)} className={`${className} ${needToNavigate ? 'relative group-hover:brightness-50 transition-all duration-500' : ''}`} {...props} src={query.data} alt="image" />
    {needToNavigate && <MdOutlineZoomOutMap onClick={() => navigate('/imagedetail/' + id)} className="w-12 h-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block btn-teal" />}
  </div>
}