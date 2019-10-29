import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, ModalController } from '@ionic/angular';
import { PortalService } from 'src/app/services/portal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {

  noticia;
  urlP = environment.urlProduccion;
  doc1;
  doc2;
  nomdoc1;
  nomdoc2;
  ext1;
  ext2;
  load;
  
  constructor(navParams: NavParams, private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService) {

      //this.util.mostrarLoading();
      this.noticia = navParams.get("noticia");
      if(this.noticia.Doc1 != "")
      {
        const p = this.noticia.Doc1.split('.');
        const t = this.noticia.Doc1.split('/');
        this.ext1 = p[1];
        this.doc1 = this.urlP+this.noticia.Doc1;
        this.nomdoc1 = t[t.length-1];
      }
      else
      {
        this.doc1 = null;
      }

      if(this.noticia.Doc2 != "")
      {
        const p = this.noticia.Doc2.split('.');
        const t = this.noticia.Doc2.split('/');
        this.ext2 = p[1];
        this.doc2 = this.urlP+this.noticia.Doc2;
        this.nomdoc2 = t[t.length-1];
      }
      else
      {
        this.doc2 = null;
      }

      this.load = true;
      console.log("noticia", this.noticia);
     }

  ngOnInit() {
  }

}
