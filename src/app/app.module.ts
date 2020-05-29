import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuRestauranteComponent } from './components/menu-restaurante/menu-restaurante.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuAdminComponent,
    InicioComponent,
    MenuRestauranteComponent,
    PlatillosComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
