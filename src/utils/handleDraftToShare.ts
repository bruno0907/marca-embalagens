import { handleFormatDate, handleFormatPadStart, handleFormatPrice } from "."
import { Draft } from "../models"

export const handleDraftToShare = (draft: Draft) => {
  if(!draft) return

  const {
    cliente,
    numero_orcamento,
    produtos,
    created_at,
    total,
    observacoes,
    status,
    status_data_aprovado,
  } = draft  

  const data = `
Orçamento: ${handleFormatPadStart(numero_orcamento)}
%0a-------------------%0a
Cliente: ${cliente}%0a
Data: ${handleFormatDate(created_at)}
%0a-------------------%0a
Descrição:%0a
${produtos?.map(produto => `${produto.quantidade} ${produto.produto} ${handleFormatPrice(produto.valor_total)}`).join('%0a')
}
%0a-------------------%0a
Total: ${handleFormatPrice(total)}
%0a-------------------%0a
${observacoes ? (
`Observações: ${observacoes}`
) : ''}
${status === 'Aprovado' ? (
`%0a-------------------%0a
Orçamento aprovado: ${handleFormatDate(status_data_aprovado)}`
) : ''}
`
  return window.open(`https://api.whatsapp.com/send?text=${data}`)
}
