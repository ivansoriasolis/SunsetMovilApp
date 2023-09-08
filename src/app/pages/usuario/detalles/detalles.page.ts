import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  nombre_usuario!: string;
  url_imagen!: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.rellenarDatosUsuario();
  }

  rellenarDatosUsuario() {
    const datosUsuario = this.userService.obtenerDatosLocalStorage();
    this.nombre_usuario = datosUsuario.nombre_completo;
    this.url_imagen = datosUsuario.url_foto;
  }

  cerrarSesion() {
    this.userService.eliminarDatosLocalStorage();
    this.router.navigate(['/login']);
  }

  verPerfil() {
    this.router.navigate(['/usuario/miperfil']);
  }
}
