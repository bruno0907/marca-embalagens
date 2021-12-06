import * as yup from 'yup'

export const newUserSchemaModel= yup.object().shape({
  nome: yup.string().required("O nome do cliente é necessário").trim(),
  razao_social: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string().trim(),
  email: yup.string().email().trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string().trim(),
  outras_informacoes: yup.string().trim(),
  endereco: yup.string().required("O endereço é necessário").trim(),
  bairro: yup.string().required("O bairro ou distrito é necessário kkkkkkkkkkkkkkkkkkkkkkk"),
  estado: yup
    .string()
    .required('')
    .test({
      message: "Selecione um estado",
      test: value => value !== "default",
    })
    .trim(),
  cidade: yup
    .string()
    .required('É preciso selecionar um estado')
    .test({
      message: "Selecione uma cidade",
      test: value => value !== "default",
    })
    .trim(),
  cep: yup.string().trim(),
  complemento: yup.string().trim(),  
})