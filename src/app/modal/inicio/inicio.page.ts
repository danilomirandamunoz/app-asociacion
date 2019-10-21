import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, IonInfiniteScroll, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  dataList:any;
  constructor(private storage: Storage,
    public modalController: ModalController,
    public alertController: AlertController) 
    {
      
      this.dataList = [];
    
    for (let i = 0; i < 25; i++) { 
      this.dataList.push({ Id: i, Nombre:"Asociación "+this.dataList.length});
    }
     }

  ngOnInit() {
  }



  cargarAsociacion(id, nombre)
  {
    this.presentAlertConfirm(id, nombre);
  }

  async presentAlertConfirm(id, nombre) {
    const alert = await this.alertController.create({
      header: 'Confirmación!',
      message: `¿Está seguro de seleccionar la <strong>${nombre}</strong> como su Asociación?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'SI',
          handler: () => {
            this.storage.set('asociacion', id);
            this.modalController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }



  loadData(event) {
    
    setTimeout(() => {
      console.log('Done');
      for (let i = 0; i < 25; i++) { 
        this.dataList.push({ Id: i, Nombre:"Asociación "+this.dataList.length});
      }
      event.target.complete();
 
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  removerAsociacion()
  { 
    this.storage.remove("asociacion");
  }

}
