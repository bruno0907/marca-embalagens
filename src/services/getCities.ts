import axios from "axios";

import { CityProps } from "../types";

const URL = process.env.NEXT_PUBLIC_IBGE_CITIES_URL
const OPTIONS = process.env.NEXT_PUBLIC_IBGE_CITIES_OPTIONS

const getCities = async (uf: string ): Promise<CityProps[]> => {
  const { data } = await axios.get<CityProps[]>(`${URL}/${uf}/${OPTIONS}`)
  return data
   
}

export { getCities }