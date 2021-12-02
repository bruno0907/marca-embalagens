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

export type ProfileProps = {
  id: string;
  user_id: string;    
  username: string;
  nome: string;
  razao_social: string;  
  cpf_cnpj: string;
  rg_ie: string;  
  email: string;
  telefone: string;
  celular: string;
  situacao_cadastral: boolean;
}

export type NewProfileProps = {  
  user_id: string;  
  username: string;
  nome: string | undefined;
  razao_social: string | undefined;  
  cpf_cnpj: string | undefined; 
  rg_ie: string | undefined;  
  email: string;
  telefone: string | undefined;
  celular: string | undefined;    
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
  endereco: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  estado: string | undefined;
  cep: string | undefined;
  complemento: string | undefined;  
  principal: boolean | undefined;
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

export type NewOrderProps = {  
  user_id: string; // dono do pedido (usuario autenticado)
  numero_pedido: number;
  cliente: string; // id do cliente do pedido  
  endereco_entrega: string;
  condicao_pagamento: string; // condicao do pagamento do pedido
  pedido: OrderItemProps[]; // pedido será um array de produtos
  total: number; // valor total do pedido
  data_entrega: Date;  
}

export type OrderProps = {
  id: string; // numero pedido
  user_id: string; // dono do pedido (usuario autenticado)
  numero_pedido: number;
  cliente: string; // id do cliente do pedido  
  endereco_entrega: string;
  condicao_pagamento: string; // condicao do pagamento do pedido
  pedido: OrderItemProps[]; // pedido será um array de produtos
  total: number; // valor total do pedido
  data_entrega: string;
  created_at: Date;
}

export type OrderItemProps = {
  quantidade: number;
  produto: string;
  valor_unitario: number;
  valor_total: number;  
}

export type CityProps = {
  id: number;
  nome: string;
};