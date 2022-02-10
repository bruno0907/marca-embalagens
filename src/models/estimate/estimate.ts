import { EstimateStatus, OrderProduct } from "..";

export type Estimate = {
  id: string; 
  user_id: string;
  numero_orcamento: number;
  cliente: string;  
  produtos: OrderProduct[];
  condicao_pagamento: string; 
  total: number;
  data_entrega: Date;
  status: EstimateStatus;
  descricao_status: string;
  status_data_aprovado: Date;
  observacoes: string;
  created_at: Date;
}