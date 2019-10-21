import { Component } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { InicioPage } from '../modal/inicio/inicio.page';

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
    private sanitizer : DomSanitizer,
    private storage: Storage,
    public modalController: ModalController) {

      this.storage.remove('asociacion');
     this.cargarPagina();
      
  }

  cargarPagina()
  {
    this.storage.get('asociacion').then((val) => {
      console.log("val", val);
      if(val)
      {
        this.presentLoading();
        this.cargarHome1();
      }
      else
      {
        console.log("cargando modal");
        this.loadModal();
      }
    });
  }

  async loadModal()
  {
    const modal = await this.modalController.create({
      component: InicioPage
    });
    modal.onDidDismiss()
      .then((data) => {
        
        this.cargarPagina();
    });
    return await modal.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  async cargarHome1() {

    const res = await this.portalService.obtenerHome1();

    if(res["Codigo"] == 0)
    {
      this.asociacion = res["Asociacion"];
      this.noticias = res["noticias"];
      this.tabla = res["tabla"];

      this.cargarHome2();
    }
    this.loading.dismiss();
    console.log("resultado de la prueba", res);
  }

  async cargarHome2() {

    

    const res = await this.portalService.obtenerHome2();
    if(res["Codigo"] == 0)
    {
      this.proximosEncuentros = res["proximosEncuentros"];
      this.ultimosEncuentros = res["ultimosEncuentros"];
      this.cargarHome3();
    }
  }

  async cargarHome3() {
    const res = await this.portalService.obtenerHome3();
    if(res["Codigo"] == 0)
    {
        this.estadios = res["estadios"];
        this.galerias = res["galerias"];      
    }
  }

}
