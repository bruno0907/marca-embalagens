import axios from "axios";

type CityProps = {
  id: number;
  nome: string;
};

const URL = process.env.NEXT_PUBLIC_IBGE_CITIES_URL
const OPTIONS = process.env.NEXT_PUBLIC_IBGE_CITIES_OPTIONS

const getCities = async (uf: string ) => {
  return await axios.get<CityProps[]>(`${URL}/${uf}/${OPTIONS}`)
   
}

export { getCities }