import axios from "axios"
import { useQuery } from "react-query"

export type State = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number,
    sigla: string;
    nome: string;
  }
}

const URL = process.env.NEXT_PUBLIC_IBGE_STATES

const fetchStates = async () => {
  const { data } = await axios.get<State[]>(URL)

  return data
}

const useStatesQuery = () => useQuery(['states'], fetchStates)

export {
  useStatesQuery
}