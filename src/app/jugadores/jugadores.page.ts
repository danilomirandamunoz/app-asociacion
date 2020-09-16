import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';
import { NombreComponent } from '../popovers/nombre/nombre.component';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {

  texto;
  jugadores;
  paginador: string;
  urlP = environment.urlProduccion;
  load;
  paginadorArray;
  asociacion: any;
  cargaIncial: any;
  
  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    public popoverController: PopoverController,
    private photoViewer: PhotoViewer,
    private store: StoreService,) {

      this.util.logVista("Jugadores");
      this.util.mostrarLoading();
      this.cargarPagina();
     }

  ngOnInit() {
  }

  async mostrarFoto(url)
  {
    var options = {
      share: true, // default is false
      closeButton: true, // iOS only: default is true
      copyToReference: false // iOS only: default is false
    };
    var urlAux= this.urlP + url;
    this.photoViewer.show(urlAux, "", options);
  }

  async presentPopover(ev: any, nombre) {
    const popover = await this.popoverController.create({
      component: NombreComponent,
      componentProps:{key1:nombre},
      event: ev,
      translucent: true,
        animated: true,
        showBackdrop: false,
        cssClass:"popover_class"
    });
    return await popover.present();
  }
  
  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarJugadores(1);
    event.target.complete();
 }

  async cargarPagina()
  {  
    this.cargaIncial = await this.store.get("cargaInicialJugadores");

    if(this.cargaIncial == 1)
    {
      console.log("jugadores carga storage");
        this.jugadores = await this.store.get("jugadores");

      
      var totalPages = await this.store.get("jugadoresTotalPages");
      var currentPage = 1;

      this.paggingTemplate(totalPages,currentPage);
    }
    else
    {
      console.log("jugadores carga web");
      await this.cargarJugadores(1);
    }


    console.log("jugadores", this.jugadores);

    
    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
    this.load=true;
    this.util.cerrarLoading();
    this.util.BannerAd();
  }

  async limpiar()
  {
    this.texto = "";
    this.cargarJugadores(1, true);
  }

  async cargarJugadores(pagina, paginador= false) {

    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      //await this.util.mostrarAlerta("Error Conexión","No se ha podido actualizar, intente nuevamente.");
      // const modal = await this.util.mostrarRecargar();
      // modal.onDidDismiss()
      //                     .then((data) => {
      //                         this.cargarJugadores(1);
      //                     });
      return;
    }

    if(paginador)
      this.util.mostrarLoadingInterno();
    console.log("carga de jugadores");
    const res = await this.portalService.obtenerJugadores(pagina, this.texto);
    //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
    if(res["Data"]) 
    {
      console.log("jugadores", res);

      this.jugadores = res["Data"];
      this.paggingTemplate(res["TotalPages"],res["CurrentPage"]);

      this.store.set("jugadores", this.jugadores);
      this.store.set("jugadoresTotalPages", res["TotalPages"]);
      this.store.set("jugadoresCurrentPage", res["CurrentPage"]);
      this.store.set("cargaInicialJugadores", 1);
    }
    this.load=true;
    this.util.cerrarLoading();
    console.log(res);
  }

  paggingTemplate(totalPage, currentPage)
  {
      var PageNumberArray = Array();
  
  
      var countIncr = 0;
      var firstPagePagination = currentPage - 2;
  
      if (totalPage <= 2)
      {
          firstPagePagination = 1;
      }
      else
      {
          if (totalPage == currentPage)
          {
              firstPagePagination = currentPage - 4;
          }
          else if (currentPage > (totalPage - 2))
          {
              firstPagePagination = totalPage - 4;
          }
      }
  
      if (firstPagePagination < 1)
      {
          firstPagePagination = 1;
      }
  
  
  
      for (var i = firstPagePagination; i <= totalPage; i++)
      {
          PageNumberArray[countIncr] = i;
  
          countIncr++;
      };
      PageNumberArray = PageNumberArray.slice(0, 5);
      var FirstPage = 1;
      var LastPage = totalPage;
      if (totalPage != currentPage)
      {
          var ForwardOne = currentPage + 1;
      }
      var BackwardOne = 1;
      if (currentPage > 1)
      {
          BackwardOne = currentPage - 1;
      }
  
      const items = [];
  
      if (currentPage == 1)
      {
          items.push({tipo:0, pagina:BackwardOne, disabled: 1});
      }
      else
      {
          items.push({tipo:0, pagina:BackwardOne, disabled: 0, active:0});
      }
  
  
  
      var numberingLoop = "";
      for (var i = 0; i < PageNumberArray.length; i++)
      {
  
          if (currentPage == PageNumberArray[i])
          {
            items.push({tipo:1, pagina:PageNumberArray[i], disabled: 0, active:1});
          }
          else
          {
              items.push({tipo:1, pagina:PageNumberArray[i], disabled: 0, active:0});
          }
      }
  
      if (totalPage == currentPage)
      {
        items.push({tipo:2, pagina:ForwardOne, disabled: 1, active:0});
      }
      else
      {
        items.push({tipo:2, pagina:ForwardOne, disabled: 0, active:0});
      }
  
      console.log("items", items);
      this.paginadorArray = items;
  
  }

}
