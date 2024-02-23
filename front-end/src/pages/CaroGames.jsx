import { Games, Create } from "../features/caro";

export default function () {
  
  return <div className="flex flex-col gap-5 items-center">
    <Games/>
    <Create/>
  </div>
}