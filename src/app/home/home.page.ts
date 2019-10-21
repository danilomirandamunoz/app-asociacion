import { Component } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController } from '@ionic/angular';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 4000,
    },
  };

  urlP = environment.urlProduccion;
  loading;
  asociacion;
  noticias;
  tabla;
  proximosEncuentros;
  ultimosEncuentros;
  estadios;
  galerias;

  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer) {

      this.presentLoading();
      this.cargarHome1();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  cargarHome1() {

    

    this.portalService.obtenerHome1().subscribe(res => {
      this.loading.dismiss();
      if(res["Codigo"] == 0)
          {
            this.asociacion = res["Asociacion"];
            this.noticias = res["noticias"];
            this.tabla = res["tabla"];

            this.cargarHome2();
          }
          
          
    });
  }

  cargarHome2() {

    

    this.portalService.obtenerHome2().subscribe(res => {
      if(res["Codigo"] == 0)
          {
            this.proximosEncuentros = res["proximosEncuentros"];
            this.ultimosEncuentros = res["ultimosEncuentros"];
            this.cargarHome3();
          }
    });
  }

  cargarHome3() {
    this.portalService.obtenerHome3().subscribe(res => {
      if(res["Codigo"] == 0)
          {

             this.estadios = res["estadios"];
             this.galerias = res["galerias"];
             
          }
 
    });
  }

}
