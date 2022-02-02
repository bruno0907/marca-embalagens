import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../../contexts/useAuth";
import { useCartContext } from "../../../../contexts/useCart";
import { CreateEstimate, useCreateEstimateMutation } from "../../../../hooks/useCreateEstimateMutation";
import { useEstimatesQuery } from "../../../../hooks/useEstimatesQuery";
import { CreateEstimateModel } from "../CreateEstimateModel";

export const CreateEstimateService = () => {
  const { session } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const {
    cartProducts,
    cartTotal
  } = useCartContext() 

  const estimates = useEstimatesQuery()
  const createEstimateMutation = useCreateEstimateMutation()

  const estimateAmount = estimates.data?.length

  const handleSubmit: SubmitHandler<CreateEstimate> = async values => {
    const { cliente, observacoes } = values

    const estimate: CreateEstimate = {
      user_id: session.user.id,
      numero_orcamento: estimateAmount + 1,
      cliente,
      produtos: [...cartProducts],
      total: cartTotal,
      observacoes,
      status: 'Pendente',
      descricao_status: '',
      status_data_aprovado: null
    }

    try {
      const response = await createEstimateMutation.mutateAsync(estimate)
      
      toast({
        description: 'Orçamento criado com sucesso!',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'bottom',
      })

      router.push(`/estimates/${response[0].id}/estimate-to-print`)

    } catch (error) {
      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }  

  return (
    <CreateEstimateModel onSubmit={handleSubmit}/>
  )
}