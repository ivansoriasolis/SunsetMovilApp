import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { stringify } from 'querystring';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin!: FormGroup;
  datosUsuario!: object;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formularioLogin = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    const sesionIniciada = localStorage.getItem('datosUsuario');

    if (sesionIniciada != null) {
      this.redireccionarModulo(
        this.userService.obtenerDatosLocalStorage()['uid']
      );
    }
  }

  redireccionarModulo(uidUsuario: string) {
    if (uidUsuario != '106549762815622887552') {
      this.router.navigate(['/usuario/main']);
      return;
    }

    this.router.navigate(['/administrador/main']);
  }

  async loguearConGoogle() {
    this.userService
      .logGoogle()
      .then((datos) => {
        this.userService.almacenarDatosLocalStorage(datos);
        this.redireccionarModulo(datos.id);
      })
      .catch((error) => console.log('error :>> ', error));
  }

  verAbout() {
    this.router.navigate(['/about']);
  }
}
