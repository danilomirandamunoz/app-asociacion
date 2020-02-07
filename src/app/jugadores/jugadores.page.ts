import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from '../services/utilidades.service';
import { NombreComponent } from '../popovers/nombre/nombre.component';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

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
  
  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    public popoverController: PopoverController,
    private photoViewer: PhotoViewer,) {

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

    await this.cargarPagina();
    event.target.complete();
 }

  async cargarPagina()
  {  
    var ping = await this.portalService.ping();
    console.log("ping", ping);
    if(!ping)
    {
      this.util.cerrarLoading();
      const modal = await this.util.mostrarRecargar();
      modal.onDidDismiss()
                          .then((data) => {
                              this.cargarPagina();
                          });
      return;
    }
    await this.cargarAsociacion();
    await this.cargarJugadores(1);
    this.util.cerrarLoading();
    this.util.BannerAd();
  }



  async cargarAsociacion()
  {
    this.asociacion = await this.portalService.storage_ObtenerAsociacion();
  }

  async limpiar()
  {
    this.texto = "";
    this.cargarJugadores(1, true);
  }

  async cargarJugadores(pagina, paginador= false) {
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
