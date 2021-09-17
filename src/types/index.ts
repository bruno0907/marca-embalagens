export type UserProps = {
  id: string;
  user_id: string;
  natureza_cliente: string;  
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

export type SupplierProps = {
  id: string;
  user_id: string;
  natureza_cliente: string;
  produto: string;
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

export type NewSupplierProps = {  
  user_id: string;
  natureza_cliente: string;
  produto: string;
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
  user_id: string;
  nome: string;
  descricao: string;
  situacao: boolean;
  preco_unitario: number;
}

export type NewProductProps = {  
  user_id: string;
  nome: string;
  descricao: string;  
  preco_unitario: number;
}

export type OrderProps = {
  id: number; // numero pedido
  user_id: string; // dono do pedido (usuario autenticado)
  cliente: string; // id do cliente do pedido  
  condicao_pagamento: string; // condicao do pagamento do pedido
  pedido: OrderItemProps[]; // pedido será um array de produtos
  total: number; // valor total do pedido
}

export type OrderItemProps = {
  quantidade: number;
  produto: ProductProps;
  total: number;  
}