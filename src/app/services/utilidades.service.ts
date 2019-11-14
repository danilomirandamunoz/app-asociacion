import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

public loading;

  constructor(public loadingController: LoadingController) { }

  async mostrarLoading() {
    this.loading = await this.loadingController.create({
      //message: 'Cargando...',
      spinner : null,
      message: `<img src="assets/img/pelota2.gif" />`,
      showBackdrop:true,
      translucent:true,
    });
    await this.loading.present();
  }

  async cerrarLoading()
  {
    await this.loading.dismiss();
  }

  async mostrarLoadingNoticia() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner : "crescent",
      showBackdrop:true,
      translucent:true,
    });
    await this.loading.present();
  }

}
