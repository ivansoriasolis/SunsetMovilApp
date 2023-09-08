import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { AlertController, IonModal } from '@ionic/angular';
import { PerfilusuarioService } from 'src/app/services/perfilusuario.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-misfotos',
  templateUrl: './misfotos.page.html',
  styleUrls: ['./misfotos.page.scss'],
})
export class MisfotosPage implements OnInit {
  publicaciones: any[] = [];
  comentarios: any[] = [];
  publicacionesConMeEncanta: any[] = [];
  moduloCargado = false;
  comentariosCargados = false;
  activo = true;
  @ViewChild('modal') modal!: IonModal;
  contenedorComentario!: FormGroup;
  idPublicacionComentar = '';
  idPublicacionEliminar = '';

  botonesAccionMisFotos = [
    {
      text: 'Eliminar publicación',
      role: 'destructive',
      icon: 'trash',
      handler: async () => {
        this.alertaConfirmarEliminacion();
      },
    },
  ];

  constructor(
    private publicacionService: PublicacionService,
    private alertController: AlertController,
    private toastService: ToastService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private perfilUsuarioService: PerfilusuarioService,
    private router: Router
  ) {
    this.contenedorComentario = this.formBuilder.group({
      comentario: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.cargarModulo();
  }

  ionViewWillLeave() {
    this.moduloCargado = false;
    this.idPublicacionEliminar = '';
  }

  async cargarModulo(evento: any = CustomEvent) {
    const uidUsuario = this.userService.obtenerDatosLocalStorage()['uid'];
    this.moduloCargado = false;
    this.publicaciones =
      await this.publicacionService.obtenerPublicacionesPersonales(uidUsuario);
    this.publicacionesConMeEncanta =
      await this.publicacionService.obtenerPublicacionesConMeEncanta(
        this.userService.obtenerDatosLocalStorage()['uid']
      );
    this.moduloCargado = true;

    if (evento == CustomEvent) return;
    evento.target.complete();
  }

  async alertaConfirmarEliminacion() {
    const alertaConfirmacion = await this.alertController.create({
      header: '¿Estas seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: async () => {
            await this.eliminarPublicacion();
            this.cargarModulo();
          },
        },
      ],
    });

    await alertaConfirmacion.present();
  }

  async eliminarPublicacion() {
    const imgFirestorage =
      await this.publicacionService.obtenerRutaImgFirestorage(
        this.idPublicacionEliminar
      );

    await this.publicacionService.eliminarImagenFirestorage(imgFirestorage);
    await this.publicacionService.eliminarPublicacion(
      this.idPublicacionEliminar
    );

    this.toastService.mostrarToast('Se eliminó la publicación', 3000, 'top');
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

  async darMeEncanta(
    idPublicacion: string,
    ion_icon: any,
    contenedorNumeroMeEncantas: any
  ) {
    let meEncanta = false;

    if (ion_icon.name == 'heart') {
      ion_icon.name = 'heart-outline';
      meEncanta = false;
    } else {
      ion_icon.name = 'heart';
      meEncanta = true;
    }

    if (meEncanta) {
      let datos = {
        id_publicacion: idPublicacion,
        autor_me_encanta: this.userService.obtenerDatosLocalStorage()['uid'],
      };

      this.agregarNumeroMeEncantas(contenedorNumeroMeEncantas);
      await this.publicacionService.agregarMeEncanta(datos, idPublicacion);
    } else {
      this.reducirNumeroMeEncantas(contenedorNumeroMeEncantas);

      const usuario = this.userService.obtenerDatosLocalStorage()['uid'];
      const publicacion = idPublicacion;
      await this.publicacionService.quitarMeEncanta(publicacion, usuario);
    }
  }

  agregarNumeroMeEncantas(contenedorNumeroMeEncantas: any) {
    const numeroActual = contenedorNumeroMeEncantas.innerText;

    if (numeroActual == '¡Sé el primero en dar me encanta!') {
      contenedorNumeroMeEncantas.innerText = '1 me encanta';
    } else {
      const valorNumerico = parseInt(numeroActual, 10) + 1;
      contenedorNumeroMeEncantas.innerText = valorNumerico + ' me encanta';
    }
  }

  reducirNumeroMeEncantas(contenedorNumeroMeEncantas: any) {
    const numeroActual = contenedorNumeroMeEncantas.innerText;
    const valorNumerico = parseInt(numeroActual, 10) - 1;

    if (valorNumerico == 0) {
      contenedorNumeroMeEncantas.innerText =
        '¡Sé el primero en dar me encanta!';
    } else {
      contenedorNumeroMeEncantas.innerText = valorNumerico + ' me encanta';
    }
  }

  async abrirModalComentarios(idPublicacion: string) {
    this.modal.present();
    this.comentarios =
      await this.publicacionService.recuperarComentariosPublicacion(
        idPublicacion
      );
    this.comentariosCargados = true;
    this.idPublicacionComentar = idPublicacion;
  }

  onModalDismiss() {
    this.comentariosCargados = false;
  }

  async guardarComentario(botonGuardarComentario: any) {
    let comentarioEscrito = this.contenedorComentario.get('comentario');
    if (comentarioEscrito!.getError('required')) {
      this.toastService.mostrarToast(
        'Ingresa un comentario primero',
        3000,
        'top'
      );
      return;
    }

    botonGuardarComentario.disabled = true;

    let datos = {
      id_publicacion: this.idPublicacionComentar,
      fecha_comentario: new Date(),
      foto_comentarista:
        this.userService.obtenerDatosLocalStorage()['url_foto'],
      nombre_comentarista:
        this.userService.obtenerDatosLocalStorage()['nombre_completo'],
      comentario: comentarioEscrito?.value,
    };

    this.contenedorComentario.get('comentario')?.reset();

    await this.publicacionService.agregarComentario(datos);
    this.comentariosCargados = false;
    this.comentarios =
      await this.publicacionService.recuperarComentariosPublicacion(
        this.idPublicacionComentar
      );

    this.comentariosCargados = true;
    botonGuardarComentario.disabled = false;
  }

  async blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }

  async compartirContenido(urlImagen: string) {
    const urlImagenEnFirebase = urlImagen;
    const respuesta = await fetch(urlImagenEnFirebase);
    const imagenEnBlob = await respuesta.blob();

    const imagenBase64 = await this.blobToBase64(imagenEnBlob);
    const fileName = `${new Date().getTime()}.jpg`;

    const { uri } = await Filesystem.writeFile({
      path: fileName,
      data: imagenBase64,
      directory: Directory.Data,
    });

    try {
      await Share.share({
        dialogTitle: 'Compartir imagen',
        text: 'Mira este hermoso atardecer 😁',
        files: [uri],
      });

      await Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Data,
      });
    } catch (error) {
      this.toastService.mostrarToast(
        'Ocurrió un error al tratar de compartir',
        3000,
        'top'
      );
    }
  }
}
