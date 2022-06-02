import { DraftStatus, OrderProduct } from "..";

export type Draft = {
  id: string; 
  user_id: string;
  numero_orcamento: number;
  cliente: string;  
  produtos: OrderProduct[];
  total: number;
  status: DraftStatus;
  descricao_status: string;
  status_data_aprovado: Date;
  observacoes: string;
  created_at: Date;
  updated_at: Date;
}