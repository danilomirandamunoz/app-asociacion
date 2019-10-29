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
    private sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService) {
      this.util.mostrarLoading();
      this.loadPage();
     }


  ngOnInit() {
  }

  async loadPage()
  {
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
  }

}
