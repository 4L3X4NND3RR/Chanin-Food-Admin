import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'subTotal'];
  transactions: Detalle[];
  transTemp: Detalle[] = [];
  total: number;
  idPedido: number;

  constructor(private servicePedido: PedidosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idPedido = +this.route.snapshot.paramMap.get('idPedido');
    this.listarDetallePedido()
  }

  listarDetallePedido() {
    this.servicePedido.getDetallePedido(this.idPedido).subscribe(
      value => {
        const length = value._embedded.detallePedidoes.length;
        for (let index = 0; index < value._embedded.detallePedidoes.length; index++) {
          const detalle = value._embedded.detallePedidoes[index];
          this.servicePedido.getPlatillo(detalle.id).subscribe(
            platillo => {
              this.transTemp.push({
                nombre: platillo.nombre,
                precio: platillo.precio,
                cantidad: detalle.cantidad,
                subTotal: detalle.subTotal
              });
              if(length-1 === index){
                this.transactions = this.transTemp;
                this.total = this.transactions.map(t => t.subTotal).reduce((acc, value) => acc + value, 0);
              }
            }
          );
        }
      }
    );
  }

  entregado(){
    this.servicePedido.getPedido(this.idPedido).subscribe(
      pedido => {
        console.log(pedido);
        this.servicePedido.pedidoEntregado(pedido).subscribe(
          value => console.log('exito!'), error => console.log('algo salio mal')
        );
      }
    );
  }
}

export interface Detalle {
  nombre: string;
  precio: number;
  cantidad: number;
  subTotal: number;
}