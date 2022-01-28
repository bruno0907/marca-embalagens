import { useState, DragEvent, useCallback } from 'react'
import NextImage from 'next/image'

import { Profile } from '../../../hooks/useProfileQuery'
import { useUploadAvatar } from '../../../hooks/useUploadAvatarMutation'

import { handleValidateAvatar } from '../../../utils/handleValidateAvatar'

import { Section } from '../../Section'

import {  
  FormControl, 
  FormErrorIcon, 
  FormErrorMessage, 
  FormHelperText, 
  FormLabel,
  Icon, 
  Input, 
  Spinner,
  Text,  
  useToast,  
} from '@chakra-ui/react'

import { FiCamera } from 'react-icons/fi'

type Props = { profile: Profile; }

const ProfileAvatar = ({ profile }: Props) => {
  const toast = useToast()
  const uploadAvatarMutation = useUploadAvatar()  
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)  

  const handleOnDrop = async (e: DragEvent) => {
    e.preventDefault()
    
    if(isLoading) return

    const { files } = e.dataTransfer
    
    await handleSelectImage(files[0])
  }  
  
  const handleSelectImage = async (file: File) => {
    if(!file) return

    const { file: avatar, error } = handleValidateAvatar(file)

    if(error) {
      setError(error)
      return
    }

    setError(null)
    setIsLoading(true) 

    try {  
      await uploadAvatarMutation.mutateAsync({
        avatar,
        profile
      })
  
      toast({
        position: 'bottom',
        status: 'success',
        title: 'Sucesso!',
        description: 'A logo foi atualizada com sucesso.',
        duration: 3000,
        isClosable: true
      })
  
      return    
  
    } catch (error) {
      toast({
        position: 'bottom',
        status: 'error',
        title: 'Ocorreu um erro!',
        description: 'Não foi possível atualizar a logo.',
        duration: 5000,
        isClosable: true
      })
  
      return
  
    } finally {
      setIsLoading(false)
  
      return
    }    
  }

  return (   
    <Section title="Logo" w="27rem" flexShrink={0}>
      <FormControl isInvalid={!!error} align="center">
        <Input id="avatar" type="file" display="none" onChange={({ target }) => handleSelectImage(target.files[0])}/>
        <Text fontWeight="medium" mb="6" textAlign="left">
          { isLoading 
            ? 'Aguarde, atualizando sua logo...'  
            : 'Arraste e solte a imagem ou clique na área abaixo para selecionar e atualizar sua logo.'
          }
        </Text>
        <FormLabel
          htmlFor="avatar"
          w="350px"
          h="110px"
          m="0"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          borderWidth="3px"
          borderColor="blue.500"
          borderStyle="dashed"
          borderRadius="md"
          bgColor={ !profile.avatar && "gray.100"}
          cursor="pointer"
          onDragEnter={e => e.preventDefault()}
          onDragOver={e => e.preventDefault()}            
          onDragLeave={e => e.preventDefault()}
          onDrop={e => handleOnDrop(e)}
          _hover={{ borderColor: 'blue.600' }}
        >
          {isLoading ? (
            <Spinner color="blue.500" />
            ) : !profile.avatar ? (
              <Icon as={FiCamera} color="blue.500" fontSize="xxx-large" my="4"/>
            ) : (
              <NextImage src={profile.avatar} alt="Logo" width={250} height={80} objectFit="contain"/>
            )}
        </FormLabel>        
        <FormHelperText fontSize="smaller" fontStyle="italic" textAlign="left">
          Otimize sua logo com arquivos do tipo PNG ou JPG e nas dimensões de 250px de largura por 80px de altura.
        </FormHelperText>
        <FormErrorMessage fontSize="smaller" textAlign="left" bgColor="red.100" p="2" borderRadius="md">
          <FormErrorIcon />{error}
        </FormErrorMessage>        
      </FormControl>
    </Section>
  )
}

export { ProfileAvatar }
