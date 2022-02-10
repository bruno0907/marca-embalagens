import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { CreateProduct } from "../models"
import { createProduct } from "../services"

export const useCreateProductMutation = () => useMutation(
  async (newProduct: CreateProduct) => {
    try {
      const { data, error } = await createProduct(newProduct)
  
      if(error) throw Error(error.message)
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['product[]'])
  }
)
