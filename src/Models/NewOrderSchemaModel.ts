import * as yup from 'yup'

export const newOrderSchemaModel = yup.object().shape({
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string().required('A data da entrega é obrigatória').trim(),
})