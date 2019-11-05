import { Component } from '@angular/core';

import { Platform, AlertController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { PortalService } from './services/portal.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { environment } from 'src/environments/environment';
import { BdService } from './services/bd.service';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NoticiaPage } from './modal/noticia/noticia.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [

    {title: 'Inicio', url: '/home', icon: 'home'},
    {title: 'Institución', url: '/institucion', icon: 'list'},
    {title: 'Clubes', url: '/clubes', icon: 'list'},
    {title: 'Jugadores', url: '/jugadores', icon: 'list'},
    {title: 'Fixture', url: '/fixture', icon: 'list'},
    {title: 'Resultados', url: '/resultados', icon: 'list'},
    {title: 'Tabla Posiciones', url: '/tabla-posiciones', icon: 'list'},
    {title: 'Sanciones', url: '/sanciones', icon: 'list'},
    {title: 'Contacto', url: '/contacto', icon: 'list'},
    
  ];

  databaseObj: SQLiteObject; // Database instance object
  name_model:string = ""; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = environment.bd; // DB name
  readonly table_name:string = environment.tabla; // Table name

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private portalService : PortalService,
    private sqlite: SQLite,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    public modalController: ModalController,
  ) {
    this.initializeApp();
    //this.cargarAsociacion();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#01d099');
     
      if (this.platform.is('cordova')) {
        
      }
      this.setupPush();

    });
  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('f8b0a9b9-77bf-4c5d-8060-b8e5809043a2', '59942433187');
 
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
    // Notifcation was received in general
    // this.oneSignal.handleNotificationReceived().subscribe(data => {
    //   let msg = data.payload.body;
    //   let title = data.payload.title;
    //   let additionalData = data.payload.additionalData;
    //   this.showAlert(title, msg, additionalData.task);
    // });
 
    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;

      this.mostrarNoticia(additionalData.task);
 
      //this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });
 
    this.oneSignal.endInit();
  }

  async mostrarNoticia(id)
  {

    let item = await this.portalService.obtenerNoticia(id);

    if(item["Codigo"] == 0)
    {
      const modal = await this.modalController.create({
        component: NoticiaPage,
        componentProps: {
          'noticia': item["noticias"]
        }
      });
      return await modal.present();
    }

    
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }

}
