import axios from "axios";
import { useQuery } from "react-query";

export type City = {
  id: number;
  nome: string;
};

const URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
const OPTIONS = "municipios?orderBy=nome"

const getCities = async (uf: string ) => {
  return await axios.get<City[]>(`${URL}/${uf}/${OPTIONS}`)
}

const useCitiesQuery = (uf: string) => useQuery(['city[]', uf], async () => {
  if(!uf) return null

  const { data } = await getCities(uf)

  if(!data) throw new Error('No cities found at given param')

  return data
})
export { useCitiesQuery }
