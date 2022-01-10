import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'

export const handleFormatDate = (date: Date | string) => {
  if(!date) return
  
  return format(new Date(date), 
    'dd/MM/yyyy', 
    { locale: ptBR }
  )
}