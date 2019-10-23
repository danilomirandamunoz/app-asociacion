import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { PortalService } from './services/portal.service';

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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private portalService : PortalService,
  ) {
    this.initializeApp();
    this.cargarAsociacion();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async cargarAsociacion()
  {
    this.storage.get('asociacion').then((val) => {
      console.log("val", val);
      if(val)
      {

        const item = this.portalService.obtenerAsociacion();
        console.log("asociacion cargada", item);     
        this.storage.set('asociacion', item);  

      }
    });
  }
}
