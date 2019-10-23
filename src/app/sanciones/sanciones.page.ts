import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sanciones',
  templateUrl: './sanciones.page.html',
  styleUrls: ['./sanciones.page.scss'],
})
export class SancionesPage implements OnInit {

  sanciones;
  sancionesclub;
  paginador: string;
  urlP = environment.urlProduccion;
  loading;
  asociacion;
  tabJugador = false;
  tabClub = false;

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController) { 

      this.tabJugador = true;
      this.loadPage();
    }

  ngOnInit() {
  }

  async loadPage()
  {
    await this.cargarAsociacion();
    this.cargar();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  async cargarAsociacion()
  {
    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
    console.log("asociacion 3", this.asociacion);
  }

  async cargar() {
    this.presentLoading();
  console.log("carga de sanciones");
  const res = await this.portalService.obtenerSanciones();
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Codigo"] == 0) 
  {
    console.log("sanciones", res);
    this.sanciones = res["sanciones"];
    this.sancionesclub = res["sancionesClub"];
  }
  else
  {
    this.sanciones =[];
    this.sancionesclub=[];
  }
  this.loading.dismiss();
}

mostrarTab(tipo){
  this.tabClub = false;
  this.tabJugador = false;
  if(tipo==1)
  {
    this.tabJugador = true;
  }
  else
  {
    this.tabClub = true;
  }
}

}
