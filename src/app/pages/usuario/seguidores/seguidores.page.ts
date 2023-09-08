import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilusuarioService } from 'src/app/services/perfilusuario.service';
import { SeguidoresService } from 'src/app/services/seguidores.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-seguidores',
  templateUrl: './seguidores.page.html',
  styleUrls: ['./seguidores.page.scss'],
})
export class SeguidoresPage implements OnInit {
  moduloCargado = false;
  uidUsuarioSeguidores = '';
  datosSeguidores: any[] = [];

  constructor(
    private seguidoresService: SeguidoresService,
    private userService: UserService,
    private perfilUsuarioService: PerfilusuarioService,
    private router: Router
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.uidUsuarioSeguidores = this.seguidoresService.uidUsuarioSeguidores;
    this.datosSeguidores =
      await this.seguidoresService.obtenerSeguidoresUsuario();

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
