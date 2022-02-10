import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { signOut } from "../services"

export const useSignOutMutation = () => useMutation(
  () => signOut(), 
  { onSuccess: () => queryClient.removeQueries()}
)
