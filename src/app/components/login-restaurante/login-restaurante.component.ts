import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login-restaurante',
  templateUrl: './login-restaurante.component.html',
  styleUrls: ['./login-restaurante.component.css']
})
export class LoginRestauranteComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private returnUrl: string;
  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AutenticacionService) { }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/administracion';

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }
  
  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        await this.authService.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }
}
