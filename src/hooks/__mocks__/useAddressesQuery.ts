const useAddressesQuery = (userId: string) => ({  
  isLoading: false,
  isError: false,
  isFetching: false,
  data: [
    {
      id: 'fake-id',
      user_id: userId,
      endereco: 'fake-address',
      bairro: 'fake-prescint',
      cidade: 'fake-city',
      estado: 'fake-state',
      cep: 'fake-zipcode',
      complemento: 'fake-complement',
      principal: true,
      
    },
    {
      id: 'fake-id2',
      user_id: userId,
      endereco: 'fake-address2',
      bairro: 'fake-prescint2',
      cidade: 'fake-city2',
      estado: 'fake-state2',
      cep: 'fake-zipcode2',
      complemento: 'fake-complement2',
      principal: false,
    },
  ]  
})

export {
  useAddressesQuery
}