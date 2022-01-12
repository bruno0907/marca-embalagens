import axios from "axios";
import { useQuery } from "react-query";

export type City = {
  id: number;
  nome: string;
};

const URL = process.env.NEXT_PUBLIC_IBGE_CITIES_URL
const OPTIONS = process.env.NEXT_PUBLIC_IBGE_CITIES_OPTIONS

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
