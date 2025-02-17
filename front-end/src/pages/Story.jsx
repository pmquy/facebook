import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MdArrowForward, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdPause } from "react-icons/md";
import { useQuery } from "react-query";
import { StoryWrapper } from "../features/post";
import CreateStory from "../features/post/components/CreateStory";
import FileApi from "../services/file";
import { getDiff } from "../utils/parseDate";
import { BsThreeDots } from "react-icons/bs";

function File({ id }) {
  const query = useQuery({
    queryKey: ['file', id],
    queryFn: () => FileApi.getFileById(id)
  })
  if (query.isLoading || query.isError) return null
  return <img src={query.data.url} className="object-cover max-h-full w-full" />
}

function Story({ stories, loadMore, hasMore }) {
  const ref = useRef()
  const [index, setIndex] = useState(0)
  const [sub, setSub] = useState(0)
  const story = stories[index]


  const handleNext = async () => {
    if (sub === story.files.length - 1) {
      if (index === stories.length - 1) await loadMore()
      setIndex(index + 1)
      setSub(0)
    } else {
      setSub(sub + 1)
    }
  }


  const handlePrev = async () => {
    if (sub === 0) {
      if (index) {
        setIndex(index - 1)
        setSub(stories[index - 1].files.length - 1)
      }
    } else {
      setSub(sub - 1)
    }
  }

  // useEffect(() => {
  //   if (story) {
  //     [...ref.current.children].forEach((e, i) => {
  //       if (i <= sub) {
  //         e.children[0].style.width = '100%'
  //       } else {
  //         e.children[0].style.width = '0%'
  //       }
  //     })
  //   }
  // }, [sub, story])


  return <div className="flex gap-5 py-5 sm:px-3 max-w-[1300px] mx-auto max-lg:flex-col h-[calc(100vh-4rem)]">

    <div className="card flex flex-col gap-5 max-lg:hidden basis-1/3 overflow-y-auto">
      <div className="text-xl font-semibold">Tin</div>
      <div className="flex gap-2 items-center">
        <CreateStory />
        <div className="">
          <div className="font-semibold">Tạo tin</div>
          <div className="text-sm">Bạn có thể chia sẻ ảnh hoặc viết gì đó</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {stories.map((e, i) => {
          const user = e.user
          return <div onClick={() => { setIndex(i); setSub(0) }} className={`${index === i ? 'bg-primary/20' : 'hover:bg-primary/10 active:bg-primary/20'} flex cursor-pointer gap-2 items-center  px-5 py-2 rounded-md`}>
            <img src={user.avatar.url} className="rounded-full object-cover w-12 h-12" />
            <div className="">
              <div className="font-semibold">{user.firstName + " " + user.lastName}</div>
              <div>{getDiff(e.createdAt)}</div>
            </div>
          </div>
        })}
      </div>
    </div>
    <div className="grow flex">
      <div className="grow flex justify-end items-center">
        <IconButton onClick={handlePrev} disabled={!index && !sub}>
          <MdKeyboardArrowLeft className="w-8 h-8" />
        </IconButton>
      </div>
      <div className="w-[400px] relative flex items-center rounded-md overflow-hidden from-rose-400 to-cyan-400 bg-gradient-to-br">
        <div className="flex flex-col gap-5 absolute top-4 left-4 right-4">
          <div ref={ref} className="flex gap-1">
            {new Array(story?.files?.length).fill(0).map((e, i) => <div className="h-1 grow bg-white/50 rounded-md" key={i}>
              <div className={`h-full ${i <= sub ? 'w-full' : 'w-0'} bg-white rounded-md`} />
            </div>)}
          </div>
          {story && <div className="flex gap-2 items-center text-white">
            <img src={story.user.avatar.url} className="rounded-full object-cover w-12 h-12" />
            <div className="t">
              <div className="font-semibold">{story.user.firstName + " " + story.user.lastName}</div>
              <div>{getDiff(story.createdAt)}</div>
            </div>
            <div className="grow"></div>
            <IconButton color="inherit">
              <MdPause className="w-6 h-6" />
            </IconButton>
            <IconButton color="inherit">
              <BsThreeDots className="w-6 h-6" />
            </IconButton>
          </div>}
        </div>
        {story && <File id={story.files[sub]} />}
      </div>
      <div className="grow flex items-center">
        <IconButton onClick={handleNext} disabled={!hasMore && index === stories.length - 1 && sub === story.files.length - 1}>
          <MdKeyboardArrowRight className="w-8 h-8" />
        </IconButton>
      </div>
    </div>

  </div>
}

export default function () {
  return <StoryWrapper><Story /></StoryWrapper>
}