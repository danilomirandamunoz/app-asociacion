import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PortalService } from '../services/portal.service';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.page.html',
  styleUrls: ['./institucion.page.scss'],
})
export class InstitucionPage implements OnInit {

asociacion;
directiva;
urlP = environment.urlProduccion;
load;

  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public util: UtilidadesService) {
      this.util.mostrarLoading();
      this.cargar();
  }

  ngOnInit() {
    
  }



  async cargar()
  {
    const res = await this.portalService.obtenerInstitucion();
    if(res["Codigo"] == 0)
    {
      this.asociacion = res["Asociacion"];
      this.directiva = res["directiva"];

    }
    this.load = true;
    this.util.cerrarLoading();
  }

}
