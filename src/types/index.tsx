export type UserProps = {
  id: string;
  user_id: string;
  natureza_cliente: 'Física' | 'Jurídica';
  tipo_cliente: 'Cliente' | 'Fornecedor';
  nome: string;
  razao_social: string;
  contato: string;
  cpf_cnpj: string;
  rg_ie: string;  
  email: string;
  telefone: string;
  celular: string;
  situacao_cadastral: boolean;
  outras_informações: string;
}

export type SupplierProps = {
  id: string;
  user_id: string;
  natureza_cliente: string;
  nome: string;
  email: string;
  telefone: string;
  celular: string;
  situacao_cadastral: boolean;
}

export type AddressProps = {
  id: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;  
}

export type ProductProps = {}

export type OrderProps = {}