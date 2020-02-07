import { Injectable } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { RecargarPage } from '../modal/recargar/recargar.page';
// import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
// import {
//   AdMobFree,
//   AdMobFreeBannerConfig,
//   AdMobFreeInterstitialConfig,
//   AdMobFreeRewardVideoConfig
// } from '@ionic-native/admob-free/ngx';
// import { Platform } from '@ionic/angular';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

public loading;
public loadingPublicidad;

// //Interstitial Ad's Configurations
// private interstitialConfig: AdMobFreeInterstitialConfig = {
//   // add your config here
//   // for the sake of this example we will just use the test config
//   isTesting: true,
//   autoShow: false,
//   id: environment.admob.interstitialId
// };
// private bannerConfig: AdMobFreeBannerConfig = {
//   isTesting: true, // Remove in production
//   autoShow: true,
//   id: environment.admob.bannerId
// };


  constructor(public loadingController: LoadingController,public modalController: ModalController, public toastController: ToastController, ) 
  { 
    // platform.ready().then(() => {
 
    //   // Load ad configuration
    //   this.admobFree.interstitial.config(this.interstitialConfig);
    //   //Prepare Ad to Show
    //   this.admobFree.interstitial.prepare()
    //     .then(() => {
    //       // alert(1);
    //     }).catch(e => alert(e));
    // });

  }

  async mostrarLoading() {
    console.log("se ha generado un loading--------------------");
    this.loading = await this.loadingController.create({
      //message: 'Cargando...',
      spinner : null,
      message: `<img src="assets/img/pelota2.gif" />`,
      //message: `<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>`,
      showBackdrop:true,
      translucent:true,
    });
    await this.loading.present();
    return this.loading;
  }

  async mostrarLoadingPublicidad() {
    console.log("se ha generado un loading publicidad--------------------");
    this.loadingPublicidad = await this.loadingController.create({
      //message: 'Cargando...',
      spinner : null,
      message: `<img src="assets/img/pelota2.gif" />`,
      //message: `<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>`,
      showBackdrop:true,
      translucent:true,
    });
    await this.loadingPublicidad.present();
  }

  async cerrarLoadingPublicidad()
  {
    console.log("se ha cerrado un loading publicidad--------------------");
    if(this.loadingPublicidad)
    {
      await this.loadingPublicidad.dismiss();
    }
    
  }

  async cerrarLoading()
  {
    console.log("se ha cerrado un loading--------------------");
    console.log("loading", this.loading);
    if(this.loading)
    {
      
      await this.loading.dismiss();

    }

    
  }



  async mostrarLoadingNoticia() {
    this.loading = await this.loadingController.create({
      message: '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>',
      spinner : null,
      showBackdrop:true,
      translucent:true,
      cssClass: 'loading-page'
    });
    await this.loading.present();
  }

  async mostrarLoadingInterno() {
    this.loading = await this.loadingController.create({
      message: '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>',
      spinner : null,
      showBackdrop:true,
      translucent:true,
      cssClass: 'loading-page-interno'
    });
    await this.loading.present();
  }

  async mostrarRecargar()
  {
    const modal = await this.modalController.create({
      component: RecargarPage
      });
    await modal.present()
    return modal;
  }

  async logVista(vista)
  {
    // this.ga.trackView(vista)
    // .then(() => {})
    // .catch(e => console.log(e));
  }

  async logEvento(categoria, accion, texto)
  {
    // this.ga.trackEvent(categoria, accion, texto, 0);
  }

  InterstitialAd() {
    // //Check if Ad is loaded
    // this.admobFree.interstitial.isReady().then(() => {
    //   //Will show prepared Ad
    //   this.admobFree.interstitial.show().then(() => {
    //   })
    //     .catch(e => alert("show " + e));
    // })
    //   .catch(e => alert("isReady " + e));
  }

  BannerAd() {
    // this.admobFree.banner.config(this.bannerConfig);
        
    // this.admobFree.banner.prepare().then(() => {
    //   //this.admobFree.banner.show();
    // }).catch(e => alert(e));
  }

  async presentToast(mensaje, tiempo:number=2000) {
    let toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo
    });



    toast.present();
    return toast;
  }

}
