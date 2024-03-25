import { useQuery } from "react-query";
import VideoApi from '../services/video'

export default function ({ id, className, ...props }) {
  const query = useQuery({
    queryKey: ['video', id],
    queryFn: () => VideoApi.getVideoById(id).then(data => {
      const blob = new Blob([new Uint8Array(data.data.data)], {type : 'video/mp4'})
      return URL.createObjectURL(blob)
    })
  })
  if (query.isError || query.isLoading) return <img className={className} {...props} src="/bg.jpg"></img>
  return <div>
    <video controls={true} className={className} {...props} src={query.data}/>
  </div>
}