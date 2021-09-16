export type UserProps = {
  id: string;
  user_id: string;
  natureza_cliente: string;
  tipo_cliente: string;
  nome: string;
  razao_social: string;
  contato: string;
  cpf_cnpj: string;
  rg_ie: string;  
  email: string;
  telefone: string;
  celular: string;
  situacao_cadastral: boolean;
  outras_informacoes: string;
}

export type NewUserProps = {  
  user_id: string;
  natureza_cliente: string;
  tipo_cliente: string;
  nome: string;
  razao_social: string;
  contato: string;
  cpf_cnpj: string;
  rg_ie: string;  
  email: string;
  telefone: string;
  celular: string;  
  outras_informacoes: string;
}  

export type AddressProps = {
  id: string;
  user_id: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string; 
  principal: boolean; 
}

export type NewAddressProps = {  
  user_id: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;  
  principal: boolean;
}

export type ProductProps = {
  id: string;
}

export type OrderProps = {
  id: number;
}