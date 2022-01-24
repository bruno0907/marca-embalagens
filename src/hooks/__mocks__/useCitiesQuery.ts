const useCitiesQuery = () => ({  
  isFetching: false,
  isLoading: false,
  isError: false,
  data: [
    {
      id: 1,      
      nome: 'Fake City',
    },
    {
      id: 2,      
      nome: 'Fake City2',
    },
    {
      id: 3,      
      nome: 'Fake City3',
    },
  ],  
})

export {
  useCitiesQuery
}