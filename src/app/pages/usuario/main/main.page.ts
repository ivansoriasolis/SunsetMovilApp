import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  constructor(
    private publicacionService: PublicacionService,
    private router: Router
  ) {}

  ngOnInit() {}

  async tomarFoto() {
    const foto = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 100,
      allowEditing: false,
      saveToGallery: false,
      resultType: CameraResultType.Uri,
    });

    this.publicacionService.urlFotoTomada = foto.webPath!;
    this.router.navigate(['/publicar']);
  }

  async seleccionarFoto() {
    const foto = await Camera.getPhoto({
      source: CameraSource.Photos,
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    this.publicacionService.urlFotoTomada = foto.webPath!;
    this.router.navigate(['/publicar']);
  }

  public actionSheetButtons = [
    {
      text: 'Usar la cámara',
      icon: 'camera-outline',
      handler: () => this.tomarFoto(),
    },
    {
      text: 'Desde el administrador de archivos',
      icon: 'folder-outline',
      handler: () => this.seleccionarFoto(),
    },
  ];
}
