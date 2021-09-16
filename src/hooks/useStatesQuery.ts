import axios from "axios"
import { useQuery } from "react-query"

type StateProps = {
  id: number;
  sigla: string;
  nome: string;
};

const STATES_URL = process.env.NEXT_PUBLIC_IBGE_STATES

const fetchStates = async () => {
  const { data } = await axios.get<StateProps[]>( STATES_URL )

  return data
}

const useStatesQuery = () => {
  const statesQuery = useQuery(['states[]'], fetchStates, {
    staleTime: 1000 * 60 * 60 * 24 // 24h
  })


  return statesQuery
}

export {
  useStatesQuery
}