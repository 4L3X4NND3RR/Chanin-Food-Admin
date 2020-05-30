import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from '../common/pedido';
import { Observable } from 'rxjs';
import { Platillo } from '../common/platillo';
import { DetallePedido } from '../common/detalle-pedido';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrlPedido = 'http://chanin-food-api.us-east-2.elasticbeanstalk.com/api/pedidos/search/findByRestauranteIdAndFechaGreaterThanAndEntregado?';
  private baseUrlDetallePedido = 'http://chanin-food-api.us-east-2.elasticbeanstalk.com/api/detallePedidos/search/findByPedidoId?';

  constructor(private httpClient: HttpClient) { }

  getPedidosPaginate(pageNumber: number, pageSize: number, idR: number, entregado: boolean): Observable<GetResponsePedidos> {
    let fecha: string = this.getFechaAyer();
    return this.httpClient.get<GetResponsePedidos>(`${this.baseUrlPedido}id=${idR}&fecha=${fecha}&entregado=${entregado}&page=${pageNumber}&size=${pageSize}`);
  }

  getDetallePedido(idPedido: number): Observable<GetResponseDetallePedido>{
    return this.httpClient.get<GetResponseDetallePedido>(`${this.baseUrlDetallePedido}idPedido=${idPedido}`);
  }

  getPlatillo(idDetalle: number): Observable<Platillo>{
    const urlPlatillo = `http://chanin-food-api.us-east-2.elasticbeanstalk.com/api/detallePedidos/${idDetalle}/platillo`;
    return this.httpClient.get<Platillo>(urlPlatillo);
  }

  pedidoEntregado(pedido: Pedido): Observable<Pedido> {
    const urlPedido = `http://chanin-food-api.us-east-2.elasticbeanstalk.com/api/pedidos/${pedido.id}`;
    return this.httpClient.put<Pedido>(urlPedido, pedido , { headers });
  }

  getPedido(idPedido: number): Observable<Pedido> {
    const urlPedido = `http://chanin-food-api.us-east-2.elasticbeanstalk.com/api/pedidos/${idPedido}`;
    return this.httpClient.get<Pedido>(urlPedido);
  }

  getFechaAyer(): string {
    let hoy = new Date();
    let Dia = 1000 * 60 * 60 * 24 * 1;
    let resta = hoy.getTime() - Dia;
    let fecha = new Date(resta);
    return `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`;
  }
}

interface GetResponsePedidos {
  _embedded: {
    pedidoes: Pedido[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseDetallePedido {
  _embedded: {
    detallePedidoes: DetallePedido[];
  }
}