import { Button, IconButton } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import MainNavBar from "../components/MainNavBar";
import { CreatePost, Posts, Story } from "../features/post";

export default function () {
  return <div className="flex gap-5 py-5 sm:px-3 max-w-[1300px] mx-auto max-lg:flex-col">
    <div className="shrink-0 basis-1/4">
      <MainNavBar />
    </div>
    <div className='flex flex-col gap-5 overflow-hidden basis-1/2 max-lg:order-1'>
      <Story />
      <CreatePost />
      <Posts query={{}} />
    </div>
    <div className="basis-1/4 shrink-0 flex lg:flex-col max-md:flex-col gap-5">
      <div className="bg-surface text-onSurface rounded-md shadow p-5 flex flex-col gap-5 max-lg:basis-1/2">
        <div className="font-bold">Who to follow</div>
        {
          [1, 2, 3].map(e => (
            <div className="gap-3 flex items-center">
              <img src="https://social.webestica.com/assets/images/avatar/04.jpg" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <div className="font-semibold">John Doe</div>
                <div className="text-sm">Web Developer</div>
              </div>
              <div className="grow" />
              <IconButton color="primary">
                <MdAdd size={24} />
              </IconButton>
            </div>
          ))
        }

        <Button variant="outlined">View more</Button>
      </div>

      <div className="bg-surface text-onSurface rounded-md shadow  p-5 flex flex-col gap-5 max-lg:basis-1/2">
        <div className="font-bold">Today's news</div>
        {
          [1, 2, 3].map(e => (
            <div>
              <Link to={'#'} className="font-semibold hover:text-primary">Ten questions you should answer truthfully</Link>
              <div className="text-sm">2 hours ago</div>
            </div>
          ))
        }
        <Button variant="outlined">View more</Button>
      </div>

    </div>
  </div>
}