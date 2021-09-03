export type UserProps = {
  id: string;
  user_id: string;
  natureza_cliente: string;
  nome: string;
  email: string;
  telefone: string;
  celular: string;
  situacao_cadastral: boolean;
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