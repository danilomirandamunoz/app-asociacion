import { Component } from '@angular/core';

import { Platform, AlertController, ModalController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PortalService } from './services/portal.service';
import { environment } from 'src/environments/environment';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NoticiaPage } from './modal/noticia/noticia.page';
import { PublicidadPage } from './modal/publicidad/publicidad.page';
import { ModalService } from './services/modal.service';
import { UtilidadesService } from './services/utilidades.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StoreService } from './services/store.service';
// import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [

    {title: 'Inicio', url: '/home', icon: 'menu'},
    {title: 'Institución', url: '/institucion', icon: 'home'},
    {title: 'Clubes', url: '/clubes', icon: 'shirt'},
    {title: 'Jugadores', url: '/jugadores', icon: 'person'},
    {title: 'Fixture', url: '/fixture', icon: 'calendar'},
    {title: 'Resultados', url: '/resultados', icon: 'football'},
    {title: 'Tabla Posiciones', url: '/tabla-posiciones', icon: 'grid'},
    {title: 'Sanciones', url: '/sanciones', icon: 'today'},
    {title: 'Contacto', url: '/contacto', icon: 'call'},
    
  ];


  public unsubscribeBackEvent: any;
  public isBackground = false;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private portalService : PortalService,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    public modalController: ModalController,
    public modalService :ModalService,
    public util:UtilidadesService,
    private store: StoreService,
  ) {
    this.initializeApp();
    //this.cargarAsociacion();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#01d099');

      // this.ga.startTrackerWithId(environment.general.googleAnaliticsId)
      // .then((item) => {
      //   console.log("se ha iniciado el analitics", item);
      // }).catch(e => alert('Error starting GoogleAnalytics == '+ e));
     
      //this.mostrarPublicidad("/content/archivos/publicidad/ImagenPublicidad_20191119122317.png","","");
      setTimeout(() => {
        this.splashScreen.hide();
      }, 3000);

      this.platform.resume.subscribe(() => {
        this.isBackground = false;
        this.portalService.obtenerGuardarAsociacionUnica();
      });
  
  
      this.platform.pause.subscribe(() => {
        this.isBackground = true;
          });
      this.setupPush();



    });
  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit(environment.general.appId, environment.general.googleProjectNumber);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
 
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      // let msg = data.payload.body;
      // let title = data.payload.title;
      // let additionalData = data.payload.additionalData;
      // this.showAlert(title, msg, additionalData.task);


      if(!this.isBackground)
      {
        let additionalData = data.payload.additionalData;
        if (additionalData.tipo == 2)//publicidad
        {
          this.mostrarPublicidad(additionalData.imagen,"","");
          
        }
        else{
        }

      }
      

    });
 
    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      console.log("click notification");
      this.util.mostrarLoadingPublicidad();
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;
      console.log("additionalData",additionalData);
      if(additionalData.tipo == 1)//Noticia
      {
        
        this.mostrarNoticia(additionalData.task);
      }
      else if (additionalData.tipo == 2)//publicidad
      {
        this.modalService.dismissAll();
        this.mostrarPublicidad(additionalData.imagen,"","");
      }
      else
      {
        this.mostrarNoticia(additionalData.task);
      }

      

    });
 
    this.oneSignal.endInit();

    // this.oneSignal.getIds().then(data => {
    //   this.store.set("playerID", data.userId)
    //   alert(JSON.stringify(data));
    // });
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

  async mostrarPublicidad(imagen, titulo, texto)
  {
    const modal = await this.modalController.create({
      component: PublicidadPage,
      componentProps: {
        'imagen': imagen,
        'titulo': titulo,
        'texto': texto,
      },
      cssClass: 'custom-modal'
    });

    await this.modalService.addModal(modal);

    return await modal.present();
  }

  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: "",
      subHeader: "¿Está seguro que desea salir de la aplicación?",
      buttons: [
        
        {
          text: `NO`,
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: `SÍ`,
          handler: () => {
            navigator['app'].exitApp();
          }
        },
      ]
    });
    alert.present();
  }

  ngOnInit(){
    this.initializeBackButtonCustomHandler();
  }
 
 
  //Called when view is left
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent && this.unsubscribeBackEvent();
  }
 
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  () => {
        
        this.showAlert();

    });
    /* here priority 101 will be greater then 100 
    if we have registerBackButtonAction in app.component.ts */
  }

}
