import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';

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

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService) { 

      this.util.mostrarLoading();
      this.cargar();
    }

  ngOnInit() {
  }

  async cargar() {
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
  this.load = true;
  this.util.cerrarLoading();
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
