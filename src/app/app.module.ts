import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ClubDetallePageModule } from './modal/club-detalle/club-detalle.module';
import { IonicStorageModule } from '@ionic/storage';
import { InicioPageModule } from './modal/inicio/inicio.module';

import { NoticiaPageModule } from './modal/noticia/noticia.module';
import { GaleriaDetallePageModule } from './modal/galeria-detalle/galeria-detalle.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NombreComponent } from './popovers/nombre/nombre.component';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { PublicidadPageModule } from './modal/publicidad/publicidad.module';
import { RecargarPageModule } from './modal/recargar/recargar.module';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HeaderSiteComponent } from './components/header-site/header-site.component';

@NgModule({
  declarations: [AppComponent, NombreComponent,HeaderSiteComponent],
  entryComponents: [NombreComponent,HeaderSiteComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ClubDetallePageModule,
    InicioPageModule,
    NoticiaPageModule,
    PublicidadPageModule,
    RecargarPageModule,
    GaleriaDetallePageModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    FileTransfer,
    AndroidPermissions,
    FileOpener,
    File,
    PhotoViewer,
    GoogleAnalytics,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
