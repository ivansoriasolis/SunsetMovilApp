import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private controladorToast: ToastController) {}

  async mostrarToast(
    message: string,
    duration: number,
    position: 'top' | 'bottom'
  ) {
    const toast = await this.controladorToast.create({
      message,
      duration,
      position,
      color: 'light',
    });
    toast.present();
  }
}
