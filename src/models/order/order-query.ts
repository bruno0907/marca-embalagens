export type OrderQuery = {
  id: string;
  user_id: string;
  numero_pedido: number;
  created_at: Date;
  total: number;
  users: {
    id: string;
    nome: string;
  }
}