import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PortalService } from '../services/portal.service';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.page.html',
  styleUrls: ['./institucion.page.scss'],
})
export class InstitucionPage implements OnInit {

asociacion;
directiva;
urlP = environment.urlProduccion;
load;

  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public util: UtilidadesService) {

      this.util.logVista("Institucion");
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
    const res = await this.portalService.obtenerInstitucion();
    if(res["Codigo"] == 0)
    {
      this.directiva = res["directiva"];

    }
    this.load = true;
    this.util.cerrarLoading();
    this.util.BannerAd();
  }

}
