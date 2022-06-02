export const handleFormatDate = (date: Date | string) => {
  if(!date) return  

  const formatedDate = new Date(new Date(date)).toLocaleString('pt-BR', { 
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short'
  })  
  
  return formatedDate
}