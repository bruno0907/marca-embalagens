import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { NewOrder } from "../../../../hooks/useCreateOrderMutation"
import { CreateOrderForm } from "../CreateOrderForm"

const newOrderSchema = yup.object().shape({
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string()
    .required('A data da entrega é obrigatória')
    .trim(),
})

type Props = {
  onSubmit: (values: NewOrder) => Promise<Response>
}

const CreateOrderUseCase = ({ onSubmit }: Props) => {
  const form = useForm<NewOrder>({
    mode: 'onSubmit',
    resolver: yupResolver(newOrderSchema)
  })
  
  return (
    <CreateOrderForm form={form} onSubmit={onSubmit}/>
  )
}

export {
  CreateOrderUseCase
}
