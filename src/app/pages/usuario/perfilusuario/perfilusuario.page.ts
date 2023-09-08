import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilusuarioService } from 'src/app/services/perfilusuario.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { SeguidoresService } from 'src/app/services/seguidores.service';
import { SeguidosService } from 'src/app/services/seguidos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
})
export class PerfilusuarioPage implements OnInit {
  uidUsuarioActual = '';
  nombreUsuarioActual = '';
  urlFotoUsuarioActual = '';
  uidUsuario = '0';
  urlFotoUsuario = '0';
  nombreUsuario = '0';
  moduloCargado = false;
  siguiendo = false;
  cantidadSeguidores = 0;
  cantidadSeguidos = 0;
  cantidadPublicaciones = 0;

  constructor(
    private perfilUsuarioService: PerfilusuarioService,
    private userService: UserService,
    private router: Router,
    private seguidoresService: SeguidoresService,
    private seguidosService: SeguidosService,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.uidUsuario = this.perfilUsuarioService.uidUsuarioVerPerfil;
    this.urlFotoUsuario = this.perfilUsuarioService.urlFotoUsuarioVerPerfil;
    this.nombreUsuario = this.perfilUsuarioService.nombreUsuarioVerPerfil;
    this.uidUsuarioActual = this.userService.obtenerDatosLocalStorage()['uid'];
    this.nombreUsuarioActual =
      this.userService.obtenerDatosLocalStorage()['nombre_completo'];
    this.urlFotoUsuarioActual =
      this.userService.obtenerDatosLocalStorage()['url_foto'];

    this.siguiendo = await this.perfilUsuarioService.verificarSiEsSeguidor(
      this.uidUsuarioActual,
      this.uidUsuario
    );

    this.cantidadSeguidores =
      await this.perfilUsuarioService.recuperarCantidadSeguidores(
        this.uidUsuario
      );
    this.cantidadSeguidos =
      await this.perfilUsuarioService.recuperarCantidadSeguidos(
        this.uidUsuario
      );

    this.cantidadPublicaciones =
      await this.perfilUsuarioService.recuperarCantidadPublicaciones(
        this.uidUsuario
      );

    this.moduloCargado = true;
  }

  ionViewWillLeave() {
    this.uidUsuarioActual = '';
    this.nombreUsuarioActual = '';
    this.urlFotoUsuarioActual = '';
    this.uidUsuario = '0';
    this.urlFotoUsuario = '0';
    this.nombreUsuario = '0';
    this.moduloCargado = false;
    this.siguiendo = false;
    this.cantidadSeguidores = 0;
    this.cantidadSeguidos = 0;
    this.cantidadPublicaciones = 0;
  }

  async seguirUsuario(
    contenedorNumeroSeguidores: any,
    nombreUsuarioSeguir: string,
    urlFotoUsuarioSeguir: string
  ) {
    if (!this.siguiendo) {
      this.siguiendo = true;
      this.agregarNumeroSeguidores(contenedorNumeroSeguidores);

      let datos = {
        uid_seguidor: this.uidUsuarioActual,
        uid_seguido: this.uidUsuario,
        nombre_seguidor: this.nombreUsuarioActual,
        foto_seguidor: this.urlFotoUsuarioActual,
        fecha_seguir: new Date(),
        nombre_seguido: nombreUsuarioSeguir,
        foto_seguido: urlFotoUsuarioSeguir,
      };

      this.perfilUsuarioService.seguirUsuario(datos);
    } else {
      this.siguiendo = false;
      this.reducirNumeroSeguidores(contenedorNumeroSeguidores);

      this.perfilUsuarioService.dejarSeguirUsuario(
        this.uidUsuarioActual,
        this.uidUsuario
      );
    }
  }

  agregarNumeroSeguidores(contenedorNumeroSeguidores: any) {
    const numeroActual = contenedorNumeroSeguidores.innerText;
    const valorNumerico = parseInt(numeroActual, 10) + 1;
    contenedorNumeroSeguidores.innerText = valorNumerico;
  }

  reducirNumeroSeguidores(contenedorNumeroSeguidores: any) {
    const numeroActual = contenedorNumeroSeguidores.innerText;
    const valorNumerico = parseInt(numeroActual, 10) - 1;
    contenedorNumeroSeguidores.innerText = valorNumerico;
  }

  verSeguidoresUsuario() {
    this.seguidoresService.uidUsuarioSeguidores = this.uidUsuario;
    this.router.navigate(['/usuario/seguidores']);
  }

  verSeguidosUsuario() {
    this.seguidosService.uidUsuarioSeguidos = this.uidUsuario;
    this.router.navigate(['/usuario/siguiendo']);
  }

  verPublicacionesUsuario() {
    this.publicacionService.uidUsuarioVerPublicaciones = this.uidUsuario;
    this.router.navigate(['/usuario/fotosusuario']);
  }
}
