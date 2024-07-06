import { Button, Dialog, IconButton, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useQuery, useQueryClient } from "react-query";
import { toast } from 'react-toastify';
import { useUser } from "../../../hooks/user";
import UserApi from '../../../services/user';
import GroupChatApi from '../services/groupChat';

export default function () {
  const [ids, setIds] = useState([])
  const [open, setOpen] = useState(false)
  const { user } = useUser()
  const nameRef = useRef()
  const queryClient = useQueryClient()

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserApi.get({ q: {} }),
    initialData: []
  })

  const handleCreate = () => {
    GroupChatApi.create({
      name: nameRef.current.value,
      users: ids
    })
      .then(() => {
        queryClient.invalidateQueries(['groupchats', user._id])
        setOpen(false)
        setIds([])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className=" flex flex-col gap-5 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-h-screen w-[90%] max-sm:w-screen overflow-y-auto bg-surface text-onSurface p-5 rounded-md">
        <TextField label="Group name" inputRef={nameRef} />
        {users.filter(e => e._id != user._id).map(e => {
          const isSelected = ids.includes(e._id)
          return (
            <div className="flex gap-5 items-center">
              <img src="https://social.webestica.com/assets/images/avatar/01.jpg" alt="" className="w-12 h-12 rounded-full" />
              <div className="font-semibold">{e.firstName} {e.lastName}</div>
              <div className="grow"></div>
              {
                isSelected ?
                  <Button onClick={() => { setIds(ids.filter(t => t != e._id)) }}>Loại</Button> :
                  <Button onClick={() => setIds([...ids, e._id])}>Thêm</Button>
              }
            </div>
          )
        })}
        <Button onClick={handleCreate} className=" self-center" variant="outlined" color="success">Tạo nhóm chat</Button>
        <Button onClick={() => setOpen(false)} className="self-center" variant="outlined" color="error">Thoát</Button>
      </div>
    </Dialog>
    <IconButton color="primary" onClick={() => setOpen(true)}>
      <FaEdit className="w-6 h-6" />
    </IconButton>
  </div>
}