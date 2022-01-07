import { CityProps } from "../../types"

export const getCities = (): Promise<CityProps[]> => {
  const data = Promise.resolve([
    { id: 1, nome: 'Fake city1' },
    { id: 2, nome: 'Fake city2' },
    { id: 3, nome: 'Fake city3' },
  ])

  return data
}