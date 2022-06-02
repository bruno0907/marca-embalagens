import { DraftStatus, OrderProduct } from "..";

export type CreateDraft = {  
  user_id: string; 
  numero_orcamento: number;
  cliente: string;   
  produtos: OrderProduct[];   
  total: number;
  observacoes: string;
  status: DraftStatus;
  descricao_status: string;
  status_data_aprovado: Date;
}