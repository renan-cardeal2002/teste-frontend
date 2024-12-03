export interface IMensagem {
  id: number;
  cliente_id: number;
  numero_destino: string;
  is_whatsapp: boolean;
  texto: string;
  data_envio: Date;
}
