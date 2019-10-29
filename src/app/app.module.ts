import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ClubDetallePage } from './modal/club-detalle/club-detalle.page';
import { ClubDetallePageModule } from './modal/club-detalle/club-detalle.module';
import { IonicStorageModule } from '@ionic/storage';
import { InicioPageModule } from './modal/inicio/inicio.module';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { NoticiaPageModule } from './modal/noticia/noticia.module';
import { GaleriaDetallePageModule } from './modal/galeria-detalle/galeria-detalle.module';

import { TooltipsModule } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ClubDetallePageModule,
    InicioPageModule,
    NoticiaPageModule,
    GaleriaDetallePageModule,
    TooltipsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
