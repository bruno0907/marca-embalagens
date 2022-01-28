const handleValidateAvatar = (file: File): {
  file?: File; 
  error?: string  
} => {
  const validTypes = ['image/jpg', 'image/jpeg', 'image/png']
  const validSize = 1000 * 1024 //5mb
  
  if(validTypes.indexOf(file.type) === -1) {      
    return {      
      error: `O arquivo "${file.name}" é inválido. Somente arquivos JPG, JPEG ou PNG são permitidos.`
    }
  } 

  if(file.size > validSize) {
    return {
      error: `O arquivo "${file.name}" excede o tamanho permitido máximo de 1024kb.`
    }
  }

  return {
    file
  }
}

export {
  handleValidateAvatar
}
