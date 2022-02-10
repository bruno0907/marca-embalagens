import { OrderProduct } from "..";

export type Order = {
  id: string; 
  user_id: string; 
  numero_pedido: number;
  cliente: string; 
  endereco_entrega: string;
  condicao_pagamento: string; 
  pedido: OrderProduct[];
  total: number;
  data_entrega: Date;
  created_at: Date;
}