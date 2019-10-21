import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PortalService } from '../services/portal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.page.html',
  styleUrls: ['./institucion.page.scss'],
})
export class InstitucionPage implements OnInit {

loading;
asociacion;
directiva;
urlP = environment.urlProduccion;

  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer) {

      this.presentLoading();
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

  cargar()
  {
    this.portalService.obtenerInstitucion().subscribe(res => {
      
      if(res["Codigo"] == 0)
          {
            this.asociacion = res["Asociacion"];
            this.directiva = res["directiva"];

          }
          this.loading.dismiss();
          
    });
  }

}
