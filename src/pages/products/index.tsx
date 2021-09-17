import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Divider } from '../../components/Divider'
import { Modal } from '../../components/Modal'
import { ProductsList } from '../../components/ProductsList'
import { NewProductForm } from '../../components/NewProductForm'

import {   
 
  Heading,
  Flex,  
  Button,
  Icon,  
  useDisclosure,    
} from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

export default function Products() {
  const { isOpen, onOpen, onClose } = useDisclosure()   
  
  function handleModalOpen() {
    onOpen()
  } 

  return (
    <>
      <Head>
        <title>Marca | Produtos</title>        
      </Head>
      <Layout>
        <Flex justify="space-between">
          <Heading>Produtos</Heading>          
            <Button              
              colorScheme="blue"
              lineHeight="base"
              leftIcon={<Icon as={FiPlus} />}
              onClick={handleModalOpen}
            >
              Cadastrar novo produto
            </Button>          
        </Flex>  
        <Divider />
        <Content>

          <ProductsList filterValue={''}/>
          
        </Content>
      </Layout>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Novo produto"
      >
        <NewProductForm onClose={onClose}/>
      </Modal>
    </>
  )
}
