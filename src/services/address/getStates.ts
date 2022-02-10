import axios from "axios"
import { State } from "../../models"

const URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"

export const getStates = async () => {
  const { data } = await axios.get<State[]>(URL)

  return data
}