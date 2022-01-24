const useProfileQuery = () => {
  return {
    isLoading: false,
    isError: false,
    isFetching: false,
    data: {
      data: {
        nome: 'Fake profile user'
      },
      address: {}
    }
  }
}

export { useProfileQuery }