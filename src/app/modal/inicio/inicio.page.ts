import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, IonInfiniteScroll, AlertController, LoadingController } from '@ionic/angular';
import { PortalService } from 'src/app/services/portal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { StoreService } from 'src/app/services/store.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  load;
  dataList:any;
  urlP = environment.urlProduccion;



  constructor(private storage: Storage,
    public modalController: ModalController,
    public alertController: AlertController,
    private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    private store: StoreService,
    public util: UtilidadesService) 
    {
      
      //this.util.mostrarLoading();
      this.dataList = [];
      this.obtenerAsociaciones();
    
     }

  ngOnInit() {
  }
  


  async obtenerAsociaciones()
  {
    
  console.log("carga de asociaciones");
  const res = await this.portalService.obtenerAsociacionesDisponibles();
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Codigo"] == 0) 
  {
    console.log("Asociaciones", res);
    this.dataList = res["Asociacion"];

  }
  this.load=true;
  this.util.cerrarLoading();
  }



  cargarAsociacion(item)
  {
    this.presentAlertConfirm(item);
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      header: 'Confirmación!',
      message: `¿Está seguro de seleccionar la <strong>${item.Nombre}</strong> como su Asociación?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'SI',
          handler: () => {
            this.util.mostrarLoading();
            this.store.set(environment.general.nombreStore, item);       
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
      // for (let i = 0; i < 25; i++) { 
      //   this.dataList.push({ Id: i, Nombre:"Asociación "+this.dataList.length});
      // }
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
