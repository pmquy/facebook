import { Link } from "react-router-dom";
import { FilePreview } from "../../../components";
import CreateStory from "./CreateStory";
import StoryWrapper from "./StoryWrapper";

function StoryPreview({ story }) {

  return <Link to={'/stories'} className="shrink-0 relative overflow-hidden rounded-lg">
    <div className="w-32 h-44 object-cover"><FilePreview id={story.files[0]} /></div>
    <div className="right-0 h-1/2 absolute bottom-0 left-0 bg-linear-180 from-transparent to-black"></div>
    <div className="absolute bottom-2 left-0 right-0 text-xs text-center text-white">{story.user.firstName} {story.user.lastName}</div>
  </Link>
}

function Story({ stories, loadMore }) {

  return <div className="flex gap-2 p-5 bg-surface text-onSurface rounded-md shadow">
    <div className="flex shrink-0 flex-col gap-2 items-center w-32 h-44 border-2 border-dashed border-primary rounded-lg justify-center">
      <CreateStory />
      <div className="text-sm">Post a story</div>
    </div>
    <div className="flex gap-2 overflow-y-auto pb-2">{stories.map(e => <StoryPreview key={e._id} story={e} />)}</div>
  </div>
}

export default function () {
  return <StoryWrapper>
    <Story />
  </StoryWrapper>
}