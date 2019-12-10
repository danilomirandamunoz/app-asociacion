import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { PortalService } from 'src/app/services/portal.service';


@Component({
  selector: 'app-recargar',
  templateUrl: './recargar.page.html',
  styleUrls: ['./recargar.page.scss'],
})
export class RecargarPage implements OnInit {
  metodo: any;

  constructor(navParams: NavParams,public modalController: ModalController ) {
    
   }

  ngOnInit() {
  }


}
