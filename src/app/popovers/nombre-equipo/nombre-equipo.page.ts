import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-nombre-equipo',
  templateUrl: './nombre-equipo.page.html',
  styleUrls: ['./nombre-equipo.page.scss'],
})
export class NombreEquipoPage implements OnInit {

  nombre;
  constructor(public navParams:NavParams) 
  {
    this.nombre = this.navParams.get('key1');
   }

  ngOnInit() {
  }

}
