import MainNavBar from "../components/MainNavBar";
import { Friends, Requested, Sending, SuggestedFriends } from "../features/friend";

export default function () {
  return <div className="flex bg-background gap-5 py-5 sm:px-3 max-w-[1300px] mx-auto max-lg:flex-col">
    <div className="basis-1/4">
      <MainNavBar />
    </div>

    <div className="flex flex-col gap-5 grow">
      <Friends />
      <Requested />
      <SuggestedFriends />
      <Sending />
    </div>

  </div>
}