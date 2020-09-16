import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';
import { NombreComponent } from '../popovers/nombre/nombre.component';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-tabla-posiciones',
  templateUrl: './tabla-posiciones.page.html',
  styleUrls: ['./tabla-posiciones.page.scss'],
})
export class TablaPosicionesPage implements OnInit {

  datos;
  paginador: string;
  urlP = environment.urlProduccion;
  load;
  asociacion;
  campeonatos: any;
  cargaIncial: any;

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    public popoverController: PopoverController,
    private store: StoreService,) { 

      this.util.logVista("Tabla Posiciones");
      this.util.mostrarLoading();
      this.cargarPagina();
    }

  ngOnInit() {
  }

  async presentPopover(ev: any, nombre) {
    const popover = await this.popoverController.create({
      component: NombreComponent,
      componentProps:{key1:nombre},
      event: ev,
      translucent: true,
        animated: true,
        showBackdrop: false,
        cssClass:"popover_class"
    });
    return await popover.present();
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarPosiciones();
    event.target.complete();
 }

  async cargarPagina() {

    this.cargaIncial = await this.store.get("cargaInicialPosiciones");

    if(this.cargaIncial == 1)
    {
      console.log("posiciones carga storage");
      this.campeonatos = await this.store.get("campeonatosPosiciones");
      // if(this.campeonatos.length>0)
      // {
      //   this.mostrarTabCampeonato(this.campeonatos[0]);
      // }
    }
    else
    {
      console.log("resulposicionestados carga web");
      await this.cargarPosiciones();
    }
    
    this.asociacion = await this.portalService.storage_ObtenerAsociacion();

    
  this.load = true;
  this.util.cerrarLoading();
  this.util.InterstitialAd();
}

  async cargarPosiciones() {
    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      //await this.util.mostrarAlerta("Error Conexión","No se ha podido actualizar, intente nuevamente.");
      // const modal = await this.util.mostrarRecargar();
      // modal.onDidDismiss()
      //                     .then((data) => {
      //                         this.cargarPosiciones();
      //                     });
      return;
    }

  console.log("carga de tablas");
  const res = await this.portalService.obtenerPosiciones();
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Codigo"] == 0) 
  {
    console.log("tablaPosiciones", res);



    this.campeonatos = res["campeonatos"];
    if(this.campeonatos.length>0)
    {
      this.mostrarTabCampeonato(this.campeonatos[0]);
    }

    this.store.set("campeonatosPosiciones", this.campeonatos);
      this.store.set("cargaInicialPosiciones", 1);
  }
  }

mostrarTab(item, camp){
console.log("mostrartab",item, camp);

camp.TablaPosiciones.forEach(tabla => {
  if(tabla.Id == item.Id)
  {
    tabla.Activa = true;
  }
  else{
    tabla.Activa = false;
  }
  
});

}

mostrarTabCampeonato(item){
  console.log(item);
    this.campeonatos.forEach(element => {
      if(element.TablaPosiciones.length > 0)
      {
        this.mostrarTab(element.TablaPosiciones[0], item);
      }
      
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

}
