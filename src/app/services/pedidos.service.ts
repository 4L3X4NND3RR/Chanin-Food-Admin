import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../common/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrl = 'http://localhost:8080/api/pedidos/search/findByRestauranteIdAndFechaGreaterThanAndEntregado?';

  constructor(private httpClient: HttpClient) { }

  getPedidosPaginate(pageNumber: number, pageSize: number, idR: number, entregado: boolean): Observable<GetResponsePedidos> {
    let fecha: string = this.getFechaAyer();
    return this.httpClient.get<GetResponsePedidos>(`${this.baseUrl}id=${idR}&fecha=${fecha}&entregado=${entregado}&page=${pageNumber}&size=${pageSize}`);
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
