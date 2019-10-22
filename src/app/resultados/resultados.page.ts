import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

 
  resultados;
  paginador: string;
  urlP = environment.urlProduccion;
  loading;
  asociacion;

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController) {
      this.cargarResultados();
     }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  async cargarResultados() {
    this.presentLoading();
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
  this.loading.dismiss();
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
