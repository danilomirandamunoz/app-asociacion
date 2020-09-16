import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ClubDetallePage } from '../modal/club-detalle/club-detalle.page';
import { UtilidadesService } from '../services/utilidades.service';
import { StoreService } from '../services/store.service';

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
  cargaIncial: any;
  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    private store: StoreService,) {

      this.util.logVista("Clubes");
      //this.presentLoading();
      this.util.mostrarLoading();
      this.cargar();
  }

  ngOnInit() {
    
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarClubes();
    event.target.complete();
  }

  async cargar()
  {

    this.cargaIncial = await this.store.get("cargaInicialClubes");
    
    if(this.cargaIncial == 1)
    {
      console.log("clubes carga storage");
      this.clubes = await this.store.get("clubes");
    }
    else{
      console.log("clubes carga web");
      await this.cargarClubes();
    }

    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
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

  obtenerNombreEstadio(nombre)
  {
    nombre = nombre.toLowerCase();
    var i = nombre.indexOf("estadio");

    if(i => 0)
    {
      return nombre;
    }
    else{
      return "Estadio " + nombre;
    }
  }

  async cargarClubes()
  {
    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      //await this.util.mostrarAlerta("Error Conexión","No se ha podido actualizar, intente nuevamente.");
      // const modal = await this.util.mostrarRecargar();
      // modal.onDidDismiss()
      //                     .then((data) => {
      //                         this.cargarClubes();
      //                     });
      return;
    }


    
    const res = await this.portalService.obtenerClubes();
    if(res["Codigo"] == 0)
    {
      this.clubes = res["clubes"];
      console.log("clubes", this.clubes);

      this.store.set("clubes", this.clubes);
      this.store.set("cargaInicialClubes", 1);

    }
  }

}