import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { CreateEstimate } from '../../../../hooks/useCreateEstimateMutation';

import { CreateEstimateView } from "../CreateEstimateView";

const newEstimateSchema = yup.object().shape({
  cliente: yup.string()
    .required('Digite o nome do cliente')
    .min(5, 'O nome do cliente deve ter no mínimo 5 caracteres')
    .max(120, 'O nome do cliente não deve ultrapassar 120 caracteres')
    .trim(),
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string().trim(),
  observacoes: yup.string().trim(),
})

type Props = {
  onSubmit: (values: CreateEstimate) => Promise<Response>
}

export const CreateEstimateModel = ({ onSubmit }: Props) => {
  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(newEstimateSchema)
  })
  
  return (
    <CreateEstimateView form={form} onSubmit={onSubmit}/>
  )
}