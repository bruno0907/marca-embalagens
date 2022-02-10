export type CreateProfile = {  
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