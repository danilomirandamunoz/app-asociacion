import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ClubDetallePage } from '../modal/club-detalle/club-detalle.page';
import { UtilidadesService } from '../services/utilidades.service';

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.page.html',
  styleUrls: ['./clubes.page.scss'],
})
export class ClubesPage implements OnInit {


  asociacion;
  clubes;
  urlP = environment.urlProduccion;
load;
  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService) {

      this.util.logVista("Clubes");
      //this.presentLoading();
      this.util.mostrarLoading();
      this.cargar();
  }

  ngOnInit() {
    
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargar();
    event.target.complete();
  }

  async cargar()
  {
    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      const modal = await this.util.mostrarRecargar();
      modal.onDidDismiss()
                          .then((data) => {
                              this.cargar();
                          });
      return;
    }


    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
    const res = await this.portalService.obtenerClubes();
    if(res["Codigo"] == 0)
    {
      this.clubes = res["clubes"];
    }
    this.load=true;
    this.util.cerrarLoading();
    this.util.BannerAd();
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