export const handleFormatPadStart = (value: number | string) => {
  const data = String(value).padStart(5, '0')  
  return data
}