import { Friends, Requested, Sending, SuggestedFriends } from "../features/friend";

export default function () {
  return <div className="flex flex-col gap-5 items-center">
    <Friends/>
    <Requested/>
    <Sending/>
    <SuggestedFriends/>
  </div>
}