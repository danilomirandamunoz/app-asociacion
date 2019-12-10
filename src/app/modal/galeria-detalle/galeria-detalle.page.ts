import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, ModalController } from '@ionic/angular';
import { PortalService } from 'src/app/services/portal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-galeria-detalle',
  templateUrl: './galeria-detalle.page.html',
  styleUrls: ['./galeria-detalle.page.scss'],
})
export class GaleriaDetallePage implements OnInit {

  galeria;
  urlP = environment.urlProduccion;
  
  constructor(navParams: NavParams, private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController) {

      this.galeria = navParams.get("item");

     }

  ngOnInit() {
  }

}
