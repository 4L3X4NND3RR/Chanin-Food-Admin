export interface Pedido {
    id: number;
    fecha: Date;
    entregado: boolean;
    monto_total: number;
    direccion: string;
    telefono: string;
}
