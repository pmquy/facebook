import { Button } from "@mui/material";
import { useState } from "react";
import { IoCalendarNumberOutline, IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FilePreview } from "../components";
import MainNavBar from "../components/MainNavBar";
import { AttendEvent, SharePost, CreateEvent, EventsWrapper } from "../features/post";

function EventCard({ event }) {

  return <div className="overflow-hidden rounded-md border-2">
    <div className="h-40 w-full"><FilePreview id={event.cover} /></div>
    <div className="p-4 flex flex-col gap-3">
      <Link to={`/events/${event._id}`} className="heading hover:text-primary max-w-full overflow-hidden text-ellipsis text-nowrap">{event.title}</Link>

      <div className="text-sm">
        <div className="flex gap-2 items-center">
          <IoCalendarNumberOutline />
          <div>{new Date(event.time).toLocaleString()}</div>
        </div>
        <div className="flex gap-2 items-center">
          <IoLocationOutline />
          <div>{event.location}</div>
        </div>
      </div>

      <div className="flex gap-5 relative items-center">
        {
          new Array(3).fill(0).map((e, i) => <div className="h-8">
            <img className="w-8 h-8 absolute rounded-full border-2 border-surface object-cover" src={`https://social.webestica.com/assets/images/avatar/0${i + 1}.jpg`}></img>
          </div>)
        }
        <div className="h-8"><div className="w-8 h-8 absolute rounded-full border-2 border-surface bg-primary text-onPrimary text-[10px] text-center content-center">20+</div></div>
        <div className="ml-5">are attending</div>
      </div>

      <div className="flex gap-5">
        <AttendEvent event={event} />
        <SharePost id={event._id} type="Event" />
      </div>
    </div>
  </div>
}

function Events({ events, loadMore, hasMore }) {

  const [nav, setNav] = useState(0)

  return <div className="flex bg-background gap-5 py-5 sm:px-3 max-w-[1300px] mx-auto max-lg:flex-col">
    <div className="basis-1/4">
      <MainNavBar />
    </div>
    <div className="flex flex-col gap-5 grow">
      <div className="card p-5 flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold">Events</div>
          <CreateEvent />
        </div>
        <div className="flex gap-1 text-nowrap overflow-y-auto pb-3 select-none">
          {["Top", "Local", "This week", "Online", "Friends", "Following"].map((e, i) => <div key={i} onClick={() => { setNav(i) }} className={`${nav === i ? 'text-primary border-primary' : 'hover:text-primary/50 border-transparent'} font-semibold px-4 pb-1 cursor-pointer border-b-2`}>{e}</div>)}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
          {events.map(e => <EventCard key={event._id} event={e} />)}
        </div>
        {hasMore && <Button onClick={loadMore} fullWidth variant="outlined" color="primary">Load more</Button>}
      </div>
    </div>
  </div>
}

export default function Page() {
  return <EventsWrapper><Events /></EventsWrapper>
}