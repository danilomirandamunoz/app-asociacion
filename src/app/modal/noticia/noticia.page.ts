import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, ModalController } from '@ionic/angular';
import { PortalService } from 'src/app/services/portal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {

  noticia;
  urlP = environment.urlProduccion;
  
  constructor(navParams: NavParams, private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController) {

      this.noticia = navParams.get("noticia");
     }

  ngOnInit() {
  }

}
