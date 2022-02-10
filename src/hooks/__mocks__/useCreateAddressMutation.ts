const useCreateAddressMutation = () => ({
  mutateAsync: (value) => Promise.resolve(value)
})
  
export {
  useCreateAddressMutation
}