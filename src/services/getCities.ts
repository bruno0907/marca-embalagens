import axios, { AxiosError, AxiosResponse } from "axios";

import { CityProps } from "../types";

const URL = process.env.NEXT_PUBLIC_IBGE_CITIES_URL
const OPTIONS = process.env.NEXT_PUBLIC_IBGE_CITIES_OPTIONS

const getCities = async (uf: string ): Promise<AxiosResponse<CityProps[]>> => {
  const response = await axios.get<CityProps[]>(`${URL}/${uf}/${OPTIONS}`)
  return response   
}

export { getCities }