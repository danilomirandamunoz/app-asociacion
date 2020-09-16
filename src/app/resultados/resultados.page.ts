import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';
import { NombreComponent } from '../popovers/nombre/nombre.component';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

 
  resultados;
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

      this.util.logVista("Resultados");
      this.util.mostrarLoading();
      this.cargarPagina();
     }

  ngOnInit() {
  }

  async doRefresh(event) {
    console.log('Recargando Resultados');

    await this.cargarResultados();
    event.target.complete();
 }

 mostrarTab(item){
  console.log(item);
  
    this.campeonatos.forEach(element => {
      if(element.Id == item.Id)
      {
        element.IdEstado = true;
        this.descolapsarUltimoItem(element);
      }
      else
      {
        element.IdEstado = false;
      }
    });

    
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


  async cargarPagina() {

    this.cargaIncial = await this.store.get("cargaInicialResultados");

    if(this.cargaIncial == 1)
    {
      console.log("resultados carga storage");
      this.campeonatos = await this.store.get("campeonatosResultados");
    }
    else
    {
      console.log("resultados carga web");
      await this.cargarResultados();
    }
    
    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
    this.load=true;
    this.util.cerrarLoading();
    this.util.InterstitialAd();
  }


  async cargarResultados() {
    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      //await this.util.mostrarAlerta("Error Conexión","No se ha podido actualizar, intente nuevamente.");
      // const modal = await this.util.mostrarRecargar();
      // modal.onDidDismiss()
      //                     .then((data) => {
      //                         this.cargarResultados();
      //                     });
      return;
    }
    console.log("carga de reultados");
    
    const res = await this.portalService.obtenerResultados();
    //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
    if(res["Codigo"] == 0) 
    {
      this.campeonatos = res["campeonatos"];
      if(this.campeonatos.length>0)
      {
        this.mostrarTab(this.campeonatos[0]);
      }

      this.store.set("campeonatosResultados", this.campeonatos);
      this.store.set("cargaInicialResultados", 1);
    }
  }

async descolapsarUltimoItem(campeonato)
  {
    console.log("descolapsarUltimoItem", campeonato);
    if(campeonato.Resultados.length > 0)
    {
      this.toogle(campeonato.Resultados[0]);
    }
    
  }

toogle(item)
  {
    if(item.IdEstado == 0)
    {
      item.IdEstado =1;
    }
    else
    {
      item.IdEstado = 0;
    }
  }

}
