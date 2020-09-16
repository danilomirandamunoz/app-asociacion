import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PortalService } from '../services/portal.service';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';
import { StoreService } from '../services/store.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.page.html',
  styleUrls: ['./institucion.page.scss'],
})
export class InstitucionPage implements OnInit {

asociacion;
directiva: any = [];
urlP = environment.urlProduccion;
load;
  cargaIncial: any;

  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public util: UtilidadesService,
    private store: StoreService,
    private photoViewer: PhotoViewer,) {

      this.util.logVista("Institucion");
      this.util.mostrarLoading();
      this.cargar();
  }

  ngOnInit() {
    
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarInstitucion();
    event.target.complete();
  }



  async cargar()
  {
    this.cargaIncial = await this.store.get("cargaInicialInstitucion");

    

    if(this.cargaIncial == 1)
    {
      console.log("Institucion: carga storage");
      this.directiva = await this.store.get("directivaasociacion");
    }
    else
    {
      console.log("Institucion: carga web");
      this.cargarInstitucion();
    }

    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
    this.load = true;
    this.util.cerrarLoading();
    
  }

  async cargarInstitucion()
  {
    
    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      await this.util.mostrarAlerta("Error Conexión","No se ha podido actualizar, intente nuevamente.");
      // this.util.presentToast("no se ha podido actualizar intente nuevamente");
      // const modal = await this.util.mostrarRecargar();
      // modal.onDidDismiss()
      //                     .then((data) => {
      //                         this.cargarInstitucion();
      //                     });
       return;
    }

    const res = await this.portalService.obtenerInstitucion();
    console.log("Institucion-Directiva", res);
    if(res["Codigo"] == 0)
    {
      this.directiva = res["directiva"];
      this.store.set("directivaasociacion", this.directiva);
      this.store.set("cargaInicialInstitucion", 1);
    }

    
  }

  async mostrarFoto(url)
  {
    var options = {
      share: true, // default is false
      closeButton: true, // iOS only: default is true
      copyToReference: false // iOS only: default is false
    };
    var urlAux= this.urlP + url;
    this.photoViewer.show(urlAux, "", options);
  }

}
