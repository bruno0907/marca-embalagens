import { EstimateStatus, OrderProduct } from "..";

export type Estimate = {
  id: string; 
  user_id: string;
  numero_orcamento: number;
  cliente: string;  
  produtos: OrderProduct[];
  total: number;
  status: EstimateStatus;
  descricao_status: string;
  status_data_aprovado: Date;
  observacoes: string;
  created_at: Date;
  updated_at: Date;
}