import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuRestauranteComponent } from './components/menu-restaurante/menu-restaurante.component';
import { PlatillosComponent } from './components/platillos/platillos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { LoginRestauranteComponent } from './components/login-restaurante/login-restaurante.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'administracion', component: MenuAdminComponent, children: [
    { path: 'inicio', component: InicioComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path: 'menu', component: MenuRestauranteComponent },
    { path: 'platillos', component: PlatillosComponent },
    { path: '', component: InicioComponent }
  ], canActivate: [AuthGuardService] },
  { path: 'login' , component: LoginRestauranteComponent },
  { path: '', redirectTo: '/administracion', pathMatch: 'full' },
  { path: '**', redirectTo: '/administracion', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuAdminComponent,
    InicioComponent,
    MenuRestauranteComponent,
    PlatillosComponent,
    PedidosComponent,
    LoginRestauranteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
