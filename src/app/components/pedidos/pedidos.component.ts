import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/common/pedido';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'entregado', 'monto_total', 'direccion', 'telefono'];
  pedidos: Pedido[];

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(private servicePedido: PedidosService, private serviceMensaje: MensajeService) { }

  ngOnInit(): void {
    this.serviceMensaje.nuevoMensaje.subscribe(
      value => this.listarPedidos(this.pageNumber)
    );
  }

  listarPedidos(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.servicePedido.getPedidosPaginate(pageNumber, this.pageSize, 1, false).subscribe(
      data => {
        this.pedidos = data._embedded.pedidoes;
        this.pageNumber = data.page.number;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    );
  }


}
