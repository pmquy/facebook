import { useQuery } from "react-query";
import ImageApi from '../services/image'
import { useState } from "react";

export default function ({ id, className, ...props }) {
  const [open, setOpen] = useState(false)
  const query = useQuery({
    queryKey: ['image', id],
    queryFn: () => ImageApi.getImageById(id).then(data => {
      const blob = new Blob([new Uint8Array(data.data.data)], {type : 'image/jpg'})
      return URL.createObjectURL(blob)
    })
  })
  if (query.isError || query.isLoading) return <img className={className} {...props} src="/bg.jpg"></img>
  return <div>
    <img onClick={() => setOpen(true)} className={className} {...props} src={query.data} alt="image" />
  </div>
}