import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilusuarioService } from 'src/app/services/perfilusuario.service';
import { SeguidosService } from 'src/app/services/seguidos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-siguiendo',
  templateUrl: './siguiendo.page.html',
  styleUrls: ['./siguiendo.page.scss'],
})
export class SiguiendoPage implements OnInit {
  moduloCargado = false;
  uidUsuarioSeguidores = '';
  datosSeguidores: any[] = [];

  constructor(
    private seguidosService: SeguidosService,
    private userService: UserService,
    private perfilUsuarioService: PerfilusuarioService,
    private router: Router
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.uidUsuarioSeguidores = this.seguidosService.uidUsuarioSeguidos;
    this.datosSeguidores = await this.seguidosService.obtenerSeguidosUsuario();

    this.moduloCargado = true;
  }

  async ionViewWillLeave() {
    this.moduloCargado = false;
    this.uidUsuarioSeguidores = '';
    this.datosSeguidores = [];
  }

  verPerfilUsuario(
    uidUsuario: string,
    urlFotoUsuario: string,
    nombreUsuario: string
  ) {
    if (uidUsuario == this.userService.obtenerDatosLocalStorage()['uid']) {
      this.router.navigate(['/usuario/miperfil']);
    } else {
      this.perfilUsuarioService.uidUsuarioVerPerfil = uidUsuario;
      this.perfilUsuarioService.urlFotoUsuarioVerPerfil = urlFotoUsuario;
      this.perfilUsuarioService.nombreUsuarioVerPerfil = nombreUsuario;

      this.router.navigate(['/usuario/perfilusuario']);
    }
  }
}
