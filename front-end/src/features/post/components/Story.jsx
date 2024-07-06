import { IconButton } from "@mui/material";
import { MdAdd } from "react-icons/md";

export default function () {
  return <div className="flex gap-5 p-5 bg-surface text-onSurface rounded-md shadow">
    <div className="flex shrink-0 flex-col gap-2 items-center w-28 h-28 border-2 border-dashed border-primary rounded-lg justify-center">
      <IconButton>
        <MdAdd size={24}/>
      </IconButton>
      <div className="text-sm">Post a story</div>
    </div>
    <div className="flex gap-2 overflow-y-auto pb-2">
      {
        [1, 2, 3, 4, 5].map(e => <div key={e} className="shrink-0 relative overflow-hidden rounded-lg">
          <img src={`https://social.webestica.com/assets/images/avatar/0${e}.jpg`} className="object-cover w-28 h-28 object-center" />
          <div className="absolute bottom-0 left-0 right-0 text-sm p-1 bg-black/50 text-white">John Doe</div>
        </div>)
      }
    </div>
  </div>
}