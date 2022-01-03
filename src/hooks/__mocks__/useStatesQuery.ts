const useStatesQuery = () => ({  
  isFetching: false,
  isLoading: false,
  isError: false,
  data: [
    {
      id: 1,
      sigla: 'FS',
      nome: 'Fake State',
    },
    {
      id: 2,
      sigla: 'FS2',
      nome: 'Fake State2',
    },
    {
      id: 3,
      sigla: 'FS3',
      nome: 'Fake State3',
    },
  ],  
})

export {
  useStatesQuery
}