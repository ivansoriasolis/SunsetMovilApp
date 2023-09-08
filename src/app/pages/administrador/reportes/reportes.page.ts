import { Component, OnInit } from '@angular/core';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  moduloCargado = false;
  reportes: any[] = [];
  constructor(
    private reportesService: ReportesService,
    private userService: UserService,
    private toastService: ToastService,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.cargarModulo();
  }

  async cargarModulo() {
    this.moduloCargado = false;
    this.reportes = await this.reportesService.recuperarReportes();
    this.moduloCargado = true;
  }

  async bloquearUsuario(idUsuario: string, boton: any) {
    boton.disabled = true;
    boton.el.innerText = 'Bloqueando ...';

    this.userService.bloquearUsuario(idUsuario);

    this.toastService.mostrarToast(
      'Se bloqueó correctamente al usuario',
      3000,
      'top'
    );

    boton.el.innerText = 'USUARIO BLOQUEADO';
  }

  async eliminarReporte(idReporte: string, boton: any) {
    boton.disabled = true;
    boton.el.innerText = 'Eliminando reporte...';
    await this.reportesService.eliminarReporte(idReporte);

    this.toastService.mostrarToast(
      'Reporte eliminado correctamente',
      3000,
      'top'
    );

    this.cargarModulo();
  }

  async eliminarPublicacion(idPublicacion: string, idReporte: any, boton: any) {
    boton.disabled = true;
    boton.el.innerText = 'Eliminando publicación...';
    await this.publicacionService.eliminarPublicacion(idPublicacion);
    await this.reportesService.eliminarReporte(idReporte);

    this.toastService.mostrarToast(
      'Publicacion eliminada correctamente',
      3000,
      'top'
    );

    this.cargarModulo();
  }
}
