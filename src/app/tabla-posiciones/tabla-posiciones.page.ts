import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tabla-posiciones',
  templateUrl: './tabla-posiciones.page.html',
  styleUrls: ['./tabla-posiciones.page.scss'],
})
export class TablaPosicionesPage implements OnInit {

  datos;
  paginador: string;
  urlP = environment.urlProduccion;
  loading;
  asociacion;

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController) { 

      this.cargar();
    }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  async cargar() {
    this.presentLoading();
  console.log("carga de tablas");
  const res = await this.portalService.obtenerPosiciones();
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Codigo"] == 0) 
  {
    console.log("tabla", res);
    this.asociacion = res["Asociacion"];
    const aux = res["tabla"];

    aux.forEach(element => {
      element.IdEstado = 1;
      if(element.Nombre =="GENERAL")
      {
        element.Activa = true;
      }
    });
    this.datos = aux;
  }
  this.loading.dismiss();
}

mostrarTab(item){
console.log(item);
  this.datos.forEach(element => {
    if(element.Nombre == item.Nombre)
    {
      element.Activa = true;
    }
    else
    {
      element.Activa = false;
    }
  });
}

}
