import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

  galerias;
  paginador: string;
  urlP = environment.urlProduccion;
  loading;
  asociacion;

  images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
  
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
    //this.presentLoading();
  console.log("carga de galerias");
  const res = await this.portalService.obtenerGalerias();
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Codigo"] == 0) 
  {
    console.log("galerias", res);
    this.asociacion = res["Asociacion"];
    const aux = res["galerias"];


    this.galerias = aux;
  }
  //this.loading.dismiss();
}

}
