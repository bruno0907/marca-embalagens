export const handleFormatPrice = (price: number) => {
  return price.toLocaleString(
    'pt-BR', 
    { 
      currency: 'BRL', 
      style: 'currency',      
    }
  )
}