import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.page.html',
  styleUrls: ['./publicidad.page.scss'],
})
export class PublicidadPage implements OnInit {
  imagen: any;
  titulo: any;
  texto: any;
  load;
  urlP = environment.urlProduccion;
  closePub = 0;
  contador:number=10;

  constructor(navParams: NavParams,
    public util: UtilidadesService,
    public sanitizer : DomSanitizer,
    public modalController: ModalController
    ) {

    
    console.log("navParams", navParams);

    this.util.logVista("Publicidad");

    this.imagen = navParams.get("imagen");
    this.titulo = navParams.get("titulo");
    this.texto = navParams.get("texto");
    this.load = true;
    this.util.cerrarLoadingPublicidad();

      var t = setInterval(function(){
        this.contador = this.contador -1;
        if(this.contador == 0)
        {
          this.closePub = 1;
          clearInterval(t);
        }
      }.bind(this),1000)


   }

  ngOnInit() {
  }

}
