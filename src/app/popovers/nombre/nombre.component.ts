import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.scss'],
})
export class NombreComponent implements OnInit {

  nombre;
  constructor(public navParams:NavParams) {
    console.log(this.navParams.data);
    this.nombre = this.navParams.get('key1');
   }

  ngOnInit() {}

}
