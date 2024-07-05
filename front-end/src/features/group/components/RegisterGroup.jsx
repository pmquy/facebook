import { toast } from "react-toastify";
import { Button } from "../../../components/ui";
import GroupApi from "../services/GroupApi";
import { useQueryClient } from "react-query";

export default function ({id}) {
  const queryClient = useQueryClient()

  const handleRegister = () => {
    GroupApi.request(id)
      .then(() => queryClient.invalidateQueries(['group', id]))
      .catch((err) => toast('Bạn đã yêu cầu tham gia nhóm này', {type : 'error'}))
  }
  return <Button onClick={handleRegister} className={'btn-teal dark:btn-grey'}>Gửi yêu cầu</Button>
}