import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

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
  loading;
  fecha:number;
  asociacion;

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController) 
    {
      this.cargarFixture();
     }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
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

  async cargarFixture() {
    this.presentLoading();
  console.log("carga de fixture");
  const res = await this.portalService.obtenerFixture();
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Codigo"] == 0) 
  {
    console.log("fixture", res);
    this.asociacion = res["Asociacion"];
    this.fixture = res["fixture"];

  }
  this.loading.dismiss();
  console.log(res);
}

}
