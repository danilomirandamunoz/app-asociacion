import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilidadesService } from '../services/utilidades.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-sanciones',
  templateUrl: './sanciones.page.html',
  styleUrls: ['./sanciones.page.scss'],
})
export class SancionesPage implements OnInit {

  sanciones;
  sancionesclub;
  paginador: string;
  urlP = environment.urlProduccion;
  load;
  asociacion;
  tabJugador = false;
  tabClub = false;
  campeonatos: any;
  cargaIncial: any;


  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    private store: StoreService,) { 

      this.util.logVista("Sanciones");
      this.tabJugador = true;
      this.util.mostrarLoading();
      this.cargarPagina();
    }

  ngOnInit() {
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarSanciones();
    event.target.complete();
 }

  async cargarPagina()
  {
    this.cargaIncial = await this.store.get("cargaInicialSanciones");

    if(this.cargaIncial == 1)
    {
      console.log("sanciones carga storage");
      this.campeonatos = await this.store.get("campeonatosSanciones");
    }
    else
    {
      console.log("sanciones carga web");
      await this.cargarSanciones();
    }

    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
    this.load = true;
    this.util.cerrarLoading();
    this.util.BannerAd();
  }

  async cargarSanciones() {
    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      // await this.util.mostrarAlerta("Error Conexión","No se ha podido actualizar, intente nuevamente.");
      // // const modal = await this.util.mostrarRecargar();
      // // modal.onDidDismiss()
      // //                     .then((data) => {
      // //                         this.cargarSanciones();
      // //                     });
      return;
    }

    const res = await this.portalService.obtenerSanciones();
  if(res["Codigo"] == 0) 
  {
    console.log("sanciones", res);
    this.campeonatos = res["campeonatos"];

    if(this.campeonatos.length>0)
    {
      this.mostrarTabCampeonato(this.campeonatos[0]);
    }

    this.store.set("campeonatosSanciones", this.campeonatos);
    this.store.set("cargaInicialSanciones", 1);

  }


  }



mostrarTabCampeonato(item){
    this.campeonatos.forEach(element => {
      this.mostrarTab(1);
      
      if(element.Id == item.Id)
      {
        element.IdEstado = true;
      }
      else
      {
        element.IdEstado = false;
      }
    });
  }

mostrarTab(tipo){
  console.log("mostrar tab",tipo);
  this.tabClub = false;
  this.tabJugador = false;
  if(tipo==1)
  {
    this.tabJugador = true;
  }
  else
  {
    this.tabClub = true;
  }
}

}
