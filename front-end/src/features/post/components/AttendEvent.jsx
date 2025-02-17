import { useState } from 'react'
import EventApi from '../services/EventApi'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { Button } from '@mui/material'

export default function AttendEvent({ event }) {
  const [isAttendee, setIsAttendee] = useState(event.isAttendee)

  const attend = async () => {
    try {
      if (isAttendee) {
        await EventApi.unattend(event._id)
      } else {
        await EventApi.attend(event._id)
      }
      setIsAttendee(!isAttendee)
    } catch (error) {

    }
  }

  return <Button fullWidth color="primary" variant={isAttendee ? "contained" : "outlined"} onClick={attend}>
    <div className="flex gap-2 justify-center">
      <MdOutlineFavoriteBorder className="w-5 h-5" />
      <div className="text-sm capitalize">{isAttendee ? "Unattend" : "Attend"}</div>
    </div>
  </Button>
}