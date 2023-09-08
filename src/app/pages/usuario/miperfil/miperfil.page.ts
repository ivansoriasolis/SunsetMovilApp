import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilusuarioService } from 'src/app/services/perfilusuario.service';
import { SeguidoresService } from 'src/app/services/seguidores.service';
import { SeguidosService } from 'src/app/services/seguidos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  uid_usuario = '';
  nombre_usuario!: string;
  url_imagen!: string;

  cantidadSeguidores = 0;
  cantidadSeguidos = 0;
  cantidadPublicaciones = 0;
  constructor(
    private userService: UserService,
    private router: Router,
    private perfilUsuarioService: PerfilusuarioService,
    private seguidoresService: SeguidoresService,
    private seguidosService: SeguidosService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.rellenarDatosUsuario();
    this.completarCamposCards();
  }

  ionWillLeave() {
    this.cantidadSeguidores = 0;
    this.cantidadSeguidos = 0;
    this.cantidadPublicaciones = 0;
  }

  rellenarDatosUsuario() {
    const datosUsuario = this.userService.obtenerDatosLocalStorage();
    this.uid_usuario = datosUsuario.uid;
    this.nombre_usuario = datosUsuario.nombre_completo;
    this.url_imagen = datosUsuario.url_foto;
  }

  async completarCamposCards() {
    this.cantidadSeguidores =
      await this.perfilUsuarioService.recuperarCantidadSeguidores(
        this.uid_usuario
      );
    this.cantidadSeguidos =
      await this.perfilUsuarioService.recuperarCantidadSeguidos(
        this.uid_usuario
      );

    this.cantidadPublicaciones =
      await this.perfilUsuarioService.recuperarCantidadPublicaciones(
        this.uid_usuario
      );
  }

  verSeguidores() {
    this.seguidoresService.uidUsuarioSeguidores = this.uid_usuario;
    this.router.navigate(['/usuario/seguidores']);
  }

  verSiguiendo() {
    this.seguidosService.uidUsuarioSeguidos = this.uid_usuario;
    this.router.navigate(['/usuario/siguiendo']);
  }

  verMisPublicaciones() {
    this.router.navigate(['/usuario/main/misfotos']);
  }
}
