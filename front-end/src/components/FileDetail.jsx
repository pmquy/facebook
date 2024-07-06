import { useQuery } from "react-query";
import FileApi from '../services/file';

export default function FileDetail({ id }) {

  const query = useQuery({
    queryKey: ['file', id],
    queryFn: () => FileApi.getFileById(id),
  })

  if (query.isError || query.isLoading) return <div></div>
  const type = query.data.type.split('/')[0]
  const src = query.data.url

  return <div className="w-full h-full">
    {type === 'video' && <video className="w-full h-full object-cover object-center" controls={true} src={src} />}
    {type === 'image' && <img className="w-full h-full object-cover object-center" src={src} />}
    {!['video', 'image'].includes(type) && <embed className="w-full h-full" src={src} />}
  </div>
}