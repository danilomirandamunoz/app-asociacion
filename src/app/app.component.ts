import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { PortalService } from './services/portal.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { environment } from 'src/environments/environment';
import { BdService } from './services/bd.service';

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
    private sqlite: SQLite
  ) {
    this.initializeApp();
    //this.cargarAsociacion();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#01d099');
     
    });
  }
}
