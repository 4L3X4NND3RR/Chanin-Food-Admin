import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private breakpointObserver: BreakpointObserver, public authService: AutenticacionService, private mensajeService: MensajeService, private snack: MatSnackBar) { 
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );

    this.mensajeService.nuevoMensaje.subscribe(
      value => {
        this.snack.open('nuevo pedido', '', {
          duration: 2000
        })
      }
    );
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  logout() {
    this.authService.logout('/login');
  }
}
