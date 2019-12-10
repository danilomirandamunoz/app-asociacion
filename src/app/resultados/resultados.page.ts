import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';
import { NombreComponent } from '../popovers/nombre/nombre.component';

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

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    public popoverController: PopoverController) {

      this.util.logVista("Resultados");
      this.util.mostrarLoading();
      this.cargarPagina();
     }

  ngOnInit() {
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarPagina();
    event.target.complete();
 }

 mostrarTab(item){
  console.log(item);
    this.campeonatos.forEach(element => {
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

    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      const modal = await this.util.mostrarRecargar();
      modal.onDidDismiss()
                          .then((data) => {
                              this.cargarPagina();
                          });
      return;
    }
  console.log("carga de reultados");
  this.asociacion = await this.portalService.storage_ObtenerAsociacion();
  const res = await this.portalService.obtenerResultados();
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Codigo"] == 0) 
  {
    this.campeonatos = res["campeonatos"];
    if(this.campeonatos.length>0)
      {
        this.mostrarTab(this.campeonatos[0]);
      }
  }
  this.load=true;
  this.util.cerrarLoading();
  this.util.InterstitialAd();
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
