import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  asociacion;
  load;
  emails;
  telefonos;
  urlP = environment.urlProduccion;
  
  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService) {

      this.util.logVista("Contacto");
      this.util.mostrarLoading();
      this.cargarPagina();
     }


  ngOnInit() {
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarPagina();
    event.target.complete();
 }

  async cargarPagina()
  {

    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      const modal = await this.util.mostrarRecargar();
      modal.onDidDismiss()
                          .then((data) => {
                              this.cargarPagina();
                          });
      return;
    }

    await this.cargarAsociacion();
    
    this.load = true;
    this.util.cerrarLoading();

  }

  async cargarAsociacion()
  {
    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
    this.emails = this.asociacion.Emails.split(';');
    this.telefonos = this.asociacion.Telefonos.split(';');

    console.log(this.emails);
    console.log("asociacion 3", this.asociacion);
    this.util.BannerAd();
  }

}
