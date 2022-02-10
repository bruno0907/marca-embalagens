export type CreateAddress = {  
  user_id: string;
  endereco: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  estado: string | undefined;
  cep: string | undefined;
  complemento: string | undefined;  
  principal: boolean | undefined;
}