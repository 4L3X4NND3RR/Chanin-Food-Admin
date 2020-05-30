import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public authService: AutenticacionService, public router: Router) { }

  async canActivate() {
    if (!await this.authService.checkAuthenticated()) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
