import { AddressProps } from "../../types"

const mockAddress = {
  id: 'fake-id',
  user_id: 'fake-userId',
  endereco: 'fake-address',
  bairro: 'fake-prescint',
  cidade: 'fake-city',
  estado: 'fake-state',
  cep: 'fake-zipcode',
  complemento: 'fake-complement',
  principal: true,
}

const prefetchAddress = async (): Promise<AddressProps> => Promise.resolve({...mockAddress})

export {
  prefetchAddress
}