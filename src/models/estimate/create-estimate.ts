import { EstimateStatus, OrderProduct } from "..";

export type CreateEstimate = {  
  user_id: string; 
  numero_orcamento: number;
  cliente: string;   
  produtos: OrderProduct[];   
  total: number;
  observacoes: string;
  status: EstimateStatus;
  descricao_status: string;
  status_data_aprovado: Date;
}