import { useQuery } from "react-query";
import { getCities } from "../services";

export const useCitiesQuery = (uf: string) => useQuery(
  ['city[]', uf], 
  async () => {
  if(!uf) return null

  const { data } = await getCities(uf)

  if(!data) throw new Error('No cities found at given param')

  return data
})
