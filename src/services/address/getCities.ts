import axios from "axios"
import { City } from "../../models"

const URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
const OPTIONS = "municipios?orderBy=nome"

export const getCities = async (uf: string ) => {
  return await axios.get<City[]>(`${URL}/${uf}/${OPTIONS}`)
}