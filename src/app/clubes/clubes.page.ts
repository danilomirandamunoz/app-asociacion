import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ClubDetallePage } from '../modal/club-detalle/club-detalle.page';

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.page.html',
  styleUrls: ['./clubes.page.scss'],
})
export class ClubesPage implements OnInit {

  loading;
  asociacion;
  clubes;
  urlP = environment.urlProduccion;

  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController) {

      this.presentLoading();
      this.cargar();
  }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      //message: 'Cargando...',
      spinner : null,
      message: `<img src="assets/img/pelota2.gif" />`,
      showBackdrop:true,
      translucent:true,
    });
    await this.loading.present();
  }

  cargar()
  {
    this.portalService.obtenerClubes().subscribe(res => {
      
      if(res["Codigo"] == 0)
          {
            this.asociacion = res["Asociacion"];
            this.clubes = res["clubes"];
          }
          this.loading.dismiss();
          
    });
  }

  async verEquipo(id) {
    const modal = await this.modalController.create({
      component: ClubDetallePage,
      componentProps: {
        'id': id
      }
    });
    return await modal.present();
  }

}