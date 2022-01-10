import axios from "axios";

import { CityProps } from "../types";

const URL = process.env.NEXT_PUBLIC_IBGE_CITIES_URL
const OPTIONS = process.env.NEXT_PUBLIC_IBGE_CITIES_OPTIONS

const getCities = async (uf: string ) => {
  const response = await axios.get<CityProps[]>(`${URL}/${uf}/${OPTIONS}`)
  return response
}

export { getCities }