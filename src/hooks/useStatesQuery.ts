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

const URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"

const fetchStates = async () => {
  const { data } = await axios.get<State[]>(URL)

  return data
}

export const useStatesQuery = () => useQuery(['states'], fetchStates)
