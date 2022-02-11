import { handleFormatDate, handleFormatPadStart, handleFormatPrice } from "."
import { Estimate } from "../models"

export const estimateToShare = (estimate: Estimate) => {

  if(!estimate) return {
    title: '',
    text: ''
  }

  const {
    cliente,
    numero_orcamento,
    condicao_pagamento,
    produtos,
    created_at,
    total
  } = estimate

  const data = {
    title: 'MARCA EMBALAGENS',
    text: 
    `
    Orçamento ${handleFormatPadStart(numero_orcamento)}
    ------------------
    Cliente: ${cliente}
    Data: ${handleFormatDate(created_at)}
    ------------------
    Condição de pagamento:${condicao_pagamento}
    ------------------
    Descrição
    ${produtos?.map(item => (
      `${item.quantidade} ${item.produto} ${item.valor_total}`
    ))}
    ------------------
    Total: ${handleFormatPrice(total)}
  
    `
  }
  

  return data
}
