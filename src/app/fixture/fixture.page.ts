import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilidadesService } from '../services/utilidades.service';
import { NombreComponent } from '../popovers/nombre/nombre.component';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.page.html',
  styleUrls: ['./fixture.page.scss'],
})
export class FixturePage implements OnInit {

  texto;
  fixture;
  paginador: string;
  urlP = environment.urlProduccion;
  load;
  fecha:number;
  asociacion;
  campeonatos: any;
  fechas:any=[];
  cargaIncial: any;

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    public popoverController: PopoverController,
    private store: StoreService,) 
    {
      this.util.logVista("Fixture");
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
  
      await this.cargarFixture();
      event.target.complete();
   }

  cambiarFecha(fecha)
  {
    
    if(this.fecha != fecha)
    {
      this.fecha = fecha;
      return true;
    }
    else
    {
      return false;
    }
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

  async cargarPagina() {

    this.cargaIncial = await this.store.get("cargaInicialFixture");

    if(this.cargaIncial == 1)
    {
      console.log("fixture carga storage");
      this.campeonatos = await this.store.get("campeonatosFixture");
    }
    else
    {
      await this.cargarFixture();
    }

    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
    this.load = true;
    this.util.cerrarLoading();
    this.util.InterstitialAd();
}
  async cargarFixture() {
    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      //await this.util.mostrarAlerta("Error Conexión","No se ha podido actualizar, intente nuevamente.");
      // const modal = await this.util.mostrarRecargar();
      // modal.onDidDismiss()
      //                     .then((data) => {
      //                         this.cargarFixture();
      //                     });
      return;
    }
  
    console.log("carga de fixture");
    const res = await this.portalService.obtenerFixture();
    if(res["Codigo"] == 0) 
    {
      

      this.campeonatos = res["campeonatos"];
      if(this.campeonatos.length>0)
      {
        this.mostrarTab(this.campeonatos[0]);
      }

      this.store.set("campeonatosFixture", this.campeonatos);
      this.store.set("cargaInicialFixture", 1);

    }
  }

}
