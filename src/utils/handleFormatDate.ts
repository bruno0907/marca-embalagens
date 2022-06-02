export const handleFormatDate = (date: Date | string) => {
  if(!date) return  

  const formatedDate = new Date(date).toLocaleString('pt-BR', { 
    timeZone: 'UTC',
    dateStyle: 'short'
  })
  
  return formatedDate
}