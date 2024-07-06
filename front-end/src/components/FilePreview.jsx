import { useQuery } from "react-query";
import FileApi from '../services/file';
import { FaFileAlt } from "react-icons/fa";

export default function FilePreview ({ id }) {

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
    {
      !['video', 'image'].includes(type) &&
      <div className={`flex flex-col items-center justify-center w-full h-full`}>
        <FaFileAlt className="w-8 h-8" />
        <div >{query.data.name}</div>
      </div>
    }
  </div>
}