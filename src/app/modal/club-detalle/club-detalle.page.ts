import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { PortalService } from 'src/app/services/portal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { NombreComponent } from 'src/app/popovers/nombre/nombre.component';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-club-detalle',
  templateUrl: './club-detalle.page.html',
  styleUrls: ['./club-detalle.page.scss'],
})
export class ClubDetallePage implements OnInit {


  load;
  equipo;
  directiva;
  urlP = environment.urlProduccion;
  idClub;

  tabGeneral = false;
  tabJugadores= false;
  tabFixture= false;
  tabResultados= false;
  jugadores: [];
  fixture: [];
  resultados: [];
  texto: string;
  paginadorArray;
  campeonatosFixture: any;
  campeonatosResultados: any;

  constructor(public navParams: NavParams, private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    public popoverController: PopoverController,
    private photoViewer: PhotoViewer,) 
  {
    this.util.logVista("Club-Detalle");
    this.util.mostrarLoading();
    this.cargarPagina();
  }

  ngOnInit() {
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    this.cargarPagina();
    event.target.complete();
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

   //this.photoViewer.show(url, null,{share:true});
 }

 async cargarPagina()
 {
  var ping = await this.portalService.ping();
  console.log("ping", ping);
  if(!ping)
  {
    this.util.cerrarLoading();
    //await this.util.mostrarAlerta("Error Conexión","No se ha podido actualizar, intente nuevamente.");
    // const modal = await this.util.mostrarRecargar();
    // modal.onDidDismiss()
    //                     .then((data) => {
    //                         this.cargarPagina();
    //                     });
    return;
  }

  this.idClub = this.navParams.get('id');
    this.cargar(this.idClub);
    this.cargarJugadores(1);
    this.cargarFixture();
    this.cargarResultados();

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

  async cargar(id)
  {
    const res = await this.portalService.obtenerDetalleClub(id);
    if(res["Codigo"] == 0)
    {
      console.log(res);
      this.equipo = res["equipo"];
      this.directiva = res["directiva"];
      this.tabGeneral = true;
    }
    this.load = true;
    this.util.cerrarLoading();
  }



  mostrarTab(tipo)
  {
    this.tabGeneral = false;
    this.tabJugadores = false;
    this.tabFixture = false;
    this.tabResultados = false;

    switch (tipo) {
      case 1:
        this.tabGeneral = true;
        break;
        case 2:
            this.tabJugadores = true;
            //this.cargarJugadores(1);
          
          
          
        break;
        case 3:
          this.tabFixture = true;
          //this.cargarFixture();
        break;
        case 4:
          this.tabResultados = true;
          //this.cargarResultados();
        break;
    
      default:
        break;
    }
  }
  async cargarResultados() {
    console.log("carga de resultados");
    const res = await this.portalService.obtenerResultadosClub(this.idClub);
    if(res["Codigo"] == 0) 
    {
      this.campeonatosResultados = res["campeonatos"];
      console.log("campeonatosFixture", this.campeonatosResultados);
      if(this.campeonatosResultados.length > 0)
      {
        this.mostrarTabResultados(this.campeonatosResultados[0]);
      }
    }
    console.log(res);
  }

  async descolapsarUltimoItem(campeonato)
  {
    console.log("descolapsarUltimoItem", campeonato);
    if(campeonato.Resultados.length > 0)
    {
      this.toogle(campeonato.Resultados[0]);
    }
    
  }

  async cargarFixture() {
    console.log("carga de fixture");
    const res = await this.portalService.obtenerFixtureClub(this.idClub);
    if(res["Codigo"] == 0) 
    {
      

      this.campeonatosFixture = res["campeonatos"];
      console.log("campeonatosFixture", this.campeonatosFixture);
      if(this.campeonatosFixture.length > 0)
      {
        this.mostrarTabFixture(this.campeonatosFixture[0]);
      }
      
    }
    console.log(res);
  }

  mostrarTabResultados(item){
    console.log(item);
      this.campeonatosResultados.forEach(element => {
        if(element.Id == item.Id)
        {
          element.IdEstado = true;
          this.descolapsarUltimoItem(element);
        }
        else
        {
          element.IdEstado = false;
        }
      });
    }

  mostrarTabFixture(item){
    console.log(item);
      this.campeonatosFixture.forEach(element => {
        if(element.Id == item.Id)
        {
          element.IdEstado = true;
        }
        else
        {
          element.IdEstado = false;
        }
      });
    }

  async cargarJugadores(pagina, paginador = false) {
    console.log("carga de jugadores");

    if(paginador)
    this.util.mostrarLoadingInterno();

    const res = await this.portalService.obtenerJugadoresClub(this.idClub,pagina, this.texto);
    if(res["Data"]) 
    {
      console.log("jugadores", res);

      this.jugadores = res["Data"];
      this.paggingTemplate(res["TotalPages"],res["CurrentPage"]);
    }

    if(paginador)
      this.util.cerrarLoading();
    console.log(res);
  }

  async limpiar()
  {
    this.texto = "";
    this.cargarJugadores(1, true);
  }

  toogle(item)
  {
    if(item.IdEstado == 0)
    {
      item.IdEstado =1;
    }
    else
    {
      item.IdEstado = 0;
    }
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