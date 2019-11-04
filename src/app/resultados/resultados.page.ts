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

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    public popoverController: PopoverController) {
      this.util.mostrarLoading();
      this.cargarResultados();
     }

  ngOnInit() {
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarResultados();
    event.target.complete();
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


  async cargarResultados() {
  console.log("carga de reultados");
  const res = await this.portalService.obtenerResultados();
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Codigo"] == 0) 
  {
    console.log("resultados", res);
    this.asociacion = res["Asociacion"];
    const aux = res["fixture"];

    aux.forEach(element => {
      element.IdEstado = 1;
    });
    this.resultados = aux;
  }
  this.load=true;
  this.util.cerrarLoading();
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
