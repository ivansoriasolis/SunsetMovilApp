import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  contenedorPublicacion!: FormGroup;
  uid_usuario!: string;
  nombre_usuario!: string;
  url_imagen!: string;
  public fotoTomada!: string;
  publicacionEnProgreso = false;
  textoBoton = 'Publicar';

  constructor(
    private publicacionService: PublicacionService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {
    this.contenedorPublicacion = this.formBuilder.group({
      descripcion: ['', [Validators.minLength(0)]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.fotoTomada = this.publicacionService.urlFotoTomada;
    this.rellenarDatosUsuario();
  }

  rellenarDatosUsuario() {
    const datosUsuario = this.userService.obtenerDatosLocalStorage();
    this.uid_usuario = datosUsuario.uid;
    this.nombre_usuario = datosUsuario.nombre_completo;
    this.url_imagen = datosUsuario.url_foto;
  }

  estadoDesactivadoBoton() {
    this.publicacionEnProgreso = true;
    this.textoBoton = 'Publicando...';
  }

  estadoActivadoBoton() {
    this.publicacionEnProgreso = false;
    this.textoBoton = 'Publicar';
  }

  async subirPublicacion() {
    this.estadoDesactivadoBoton();

    const urlFotoTomada = this.publicacionService.urlFotoTomada;
    const rutaImgFirestorage =
      await this.publicacionService.subirImagenFirestorage(urlFotoTomada);

    let datosPublicacion = {
      uid_autor: this.uid_usuario,
      autor: this.nombre_usuario,
      foto_autor: this.url_imagen,
      fecha: new Date(),
      descripcion: this.contenedorPublicacion.get('descripcion')?.value,
      imagen: rutaImgFirestorage,
      me_encanta: 0,
    };

    await this.publicacionService.subirPublicacionFirestore(datosPublicacion);

    this.toastService.mostrarToast('¡Publicación exitosa!', 2000, 'top');
    this.estadoActivadoBoton();
    this.router.navigate(['/usuario/main']);
  }
}
