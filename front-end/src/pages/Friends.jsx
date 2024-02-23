import { useContext } from "react";
import { Friends, Requested, Sending, SuggestedFriends } from "../features/friend";
import CommonContext from "../store/CommonContext";

export default function () {

  const {user} = useContext(CommonContext)
  if(!user) return <></>

  return <div className="flex flex-col gap-5 items-center">
    <Friends/>
    <Requested/>
    <Sending/>
    <SuggestedFriends/>
  </div>
}