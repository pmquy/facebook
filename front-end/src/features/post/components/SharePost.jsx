import { Button } from '@mui/material'
import { CiShare2 } from 'react-icons/ci'

export default function ({id}) {

  return <Button startIcon={<CiShare2/>}>
    <div className='text-sm font-semibold capitalize'>Share</div>
  </Button>
}