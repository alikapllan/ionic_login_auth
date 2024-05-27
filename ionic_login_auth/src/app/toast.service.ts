import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastControl: ToastController) { }

  async showToast(msg:string,position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastControl.create({
      message: msg,
      duration: 1000,
      position: position,
    });
    toast.present();
  }
}
