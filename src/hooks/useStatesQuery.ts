import { useQuery } from "react-query"
import { getStates } from "../services"

export const useStatesQuery = () => useQuery(['states'], getStates)
