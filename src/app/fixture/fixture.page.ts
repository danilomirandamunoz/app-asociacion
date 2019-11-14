import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilidadesService } from '../services/utilidades.service';
import { NombreComponent } from '../popovers/nombre/nombre.component';

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

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    public popoverController: PopoverController) 
    {
      
      this.util.mostrarLoading();
      this.cargarFixture();
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

  async cargarFixture() {
  
  console.log("carga de fixture");
  this.asociacion = await this.portalService.storage_ObtenerAsociacion();
  const res = await this.portalService.obtenerFixture();
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Codigo"] == 0) 
  {
    

    this.campeonatos = res["campeonatos"];
    if(this.campeonatos.length>0)
      {
        this.mostrarTab(this.campeonatos[0]);
      }

  }
  this.load = true;
  this.util.cerrarLoading();
  console.log(res);
}

}
