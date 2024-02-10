import { useQuery } from "react-query";
import ImageApi from '../services/image'

export default function ({id, className, ...props}) {    
  const query = useQuery({
    queryKey : ['image', id],  
    queryFn : () => ImageApi.getImageById(id).then(data => {
      const base64String = btoa(new Uint8Array(data.data.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      return `data:image/jpg;base64,${base64String}`;
    })
  })  
  if(query.isError || query.isLoading) return <></>      
  return <img className={`${className} rounded-xl`} {...props} src={query.data} alt="fdkj"/>
}