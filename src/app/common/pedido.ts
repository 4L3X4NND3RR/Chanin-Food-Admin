export interface Pedido {
    id: number;
    fecha: Date;
    entregado: boolean;
    monto_total: number;
    direccion: string;
    telefono: string;
    _links: {
        self: {
            href: string;
        },
        pedido: {
            href: string;
        },
        restaurante: {
            href: string;
        },
        cliente: {
            href: string;
        },
        detallePedidos: {
            href: string;
        }
    }
}
