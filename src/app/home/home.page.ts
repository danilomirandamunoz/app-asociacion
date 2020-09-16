import { Component } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { ModalController, PopoverController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

import { InicioPage } from '../modal/inicio/inicio.page';
import { NoticiaPage } from '../modal/noticia/noticia.page';


import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StoreService } from '../services/store.service';
import { UtilidadesService } from '../services/utilidades.service';
import { NombreComponent } from '../popovers/nombre/nombre.component';
import { PublicidadPage } from '../modal/publicidad/publicidad.page';
import { NotificacionesPage } from '../modal/notificaciones/notificaciones.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    initialSlide: 0,
    loop: true,
    speed: 400,
    autoplay: {
      delay: 4000,
    },
  };

  urlP = environment.urlProduccion;
  asociacion;
  noticias;
  tabla;
  proximosEncuentros;
  ultimosEncuentros;
  estadios;
  galerias;
  paginador: string;
  loadingnoticias;
  paginadorArray;
  load;
  noticiasdestacadas: any;
  fechaUltimosResultados: any;
  fechaProximosEncuentros: any;
  campeonatos: any;
  loading;

  cargaIncial:any;

  colapsadortablaposiciones:number=1;
  colapsadorultimosencuentros:number=1;
  colapsadorproximosencuentros:number=1;


  constructor(
    private portalService : PortalService,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    private splashScreen: SplashScreen,
    private store: StoreService,
    public util: UtilidadesService,
    public popoverController: PopoverController) {


    this.util.logVista("Home");
    
     this.cargarPagina();
      
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

  async ngOnInit() {
    await this.util.mostrarLoading();

    //console.log("loading", this.loading);
  }

   async cargarPagina(){

    this.cargaIncial = await this.store.get(environment.nombrePrimeraSession);


      var ping = await this.portalService.ping();
      console.log("ping", ping);
      if(!ping)
      {
        this.util.cerrarLoading();
        //this.loading.dismiss();
        //await this.util.mostrarAlerta("Error Conexión","No se ha podido actualizar, intente nuevamente.");
        // const modal = await this.util.mostrarRecargar();
        // modal.onDidDismiss()
        //                     .then(async () => {
        //                       await this.util.mostrarLoading();
        //                         this.cargarPagina();
        //                     });
        return;
      }

      if(environment.unica == 1)
      {
        let resAso = await this.portalService.obtenerAsociacionUnica(environment.general.idAsociacion);
        console.log("obtenerAsociacionUnica", resAso);
        if(resAso["Codigo"] == 0)
        {
          await this.store.set(environment.general.nombreStore, resAso["Asociacion"]);
        }
      }
      console.log("obtener la asociacion guardada", environment.general.nombreStore);
      var res = await this.store.get(environment.general.nombreStore);

      if(res!= null)
      {
        
        this.asociacion = res;
        console.log(this.asociacion);       
        this.cargarHome();
      }
      else{
        this.loadModal();
      }
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarSeccionesHome();
    event.target.complete();
  }

  async loadModal()
  {
    const modal = await this.modalController.create({
      component: InicioPage
    });
    modal.onDidDismiss()
      .then(() => {
        this.cargarPagina();
    });
    return await modal.present();
  }

  async mostrarNotificaciones()
  {
    const modal = await this.modalController.create({
      component: NotificacionesPage
    });
    return await modal.present();
  }

  async cargarHome()
  {
    console.log("cargaInicial", this.cargaIncial);
    if(this.cargaIncial == 56)
    {

      console.log("obtengo la data desde storage");
      this.noticiasdestacadas = await this.store.get("noticiasdestacadas");
      this.campeonatos = await this.store.get("campeonatoshome");
      this.estadios = await this.store.get("estadios");
      this.noticias = await this.store.get("noticias");
      
      
      var totalPages = await this.store.get("noticiasTotalPages");
      var currentPage = 1;

      this.paggingTemplate(totalPages,currentPage);

      this.load=true;
      this.util.cerrarLoading();
    }
    else{
        //aca debo obtener los datos de todos las secciones
         this.cargarSeccionesHome();
    }
  }

  async cargarSeccionesHome()
  {
    this.cargarNoticiasDestacadas();
    this.cargarTablasHome();
     this.cargarEstadios();
     this.cargarNoticias(1);

    this.store.set(environment.nombrePrimeraSession, 1);

    this.load=true;
    this.util.cerrarLoading();
  }

  async cargarNoticiasDestacadas()
  {
    this.portalService.obtenerNoticiasDestacadas().then(notDest =>{
      if(notDest)
      {
        if(notDest["Codigo"] == 0)
        {
          this.noticiasdestacadas = notDest["noticias"];
          //aca guardo las noticias destacadas en storage para asi no tener que cargarlas desde la web nuevamente
          this.store.set("noticiasdestacadas", this.noticiasdestacadas);
        }
      }
    });
      
  }

  async cargarEstadios()
  {
    this.portalService.obtenerHome3().then(res=>{
      if(res["Codigo"] == 0)
      {
          this.estadios = res["estadios"];
          //aca guardo en storage para asi no tener que cargarlas desde la web nuevamente
          this.store.set("estadios", this.estadios);
      }
    });
    
  }

  async cargarTablasHome()
  {
    this.portalService.obtenerHome1().then(res=>{
      if(res)
    {
      if(res["Codigo"] == 0)
      {
        this.campeonatos = res["campeonatos"];
        if(this.campeonatos.length>0)
        {
          this.mostrarTab(this.campeonatos[0]);
        }

        //aca guardo en storage para asi no tener que cargarlas desde la web nuevamente
        this.store.set("campeonatoshome", this.campeonatos);
  
        this.cargarHome3();
      }
    }
    });

    
  }

  mostrarTab(item){

    this.colapsadortablaposiciones = 1;
    this.colapsadorultimosencuentros = 1;
    this.colapsadorproximosencuentros = 1;
    console.log(item);
      this.campeonatos.forEach(element => {
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

  async cargarHome3() {
    const res = await this.portalService.obtenerHome3();
    if(res["Codigo"] == 0)
    {
        this.estadios = res["estadios"];
        //aca guardo en storage para asi no tener que cargarlas desde la web nuevamente
        this.store.set("estadios", this.estadios);
    }

    this.util.BannerAd();
    this.cargarNoticias(1);
  }



  async mostrarNoticia(item)
  {
    const modal = await this.modalController.create({
      component: NoticiaPage,
      componentProps: {
        'noticia': item
      },
      
    });
    return await modal.present();
  }

  async mostrarPublicidad()
  {
    const modal = await this.modalController.create({
      component: PublicidadPage,
      componentProps: {
        'imagen': "/Content/portal/img/quebuscas.png",
        'titulo': "titulo de la publicidad",
        'texto': "texto de la publicidad",
      },
      cssClass: 'custom-modal'
    });
    return await modal.present();
  }

  async cargarNoticias(pagina, paginador = false) 
  {
    if(paginador)
      this.util.mostrarLoadingInterno();

    //this.noticias =[];
    this.loadingnoticias = true;
    console.log("carga de noticias");
    this.portalService.obtenerNoticias(pagina).then(res=>{
        //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
        if(res["Data"]) 
        {
          console.log("noticias", res);

          this.noticias = res["Data"];
          this.loadingnoticias = null;
          this.paggingTemplate(res["TotalPages"],res["CurrentPage"]);

          //aca guardo en storage para asi no tener que cargarlas desde la web nuevamente
          this.store.set("noticias", this.noticias);
          this.store.set("noticiasTotalPages", res["TotalPages"]);
          this.store.set("noticiasCurrentPage", res["CurrentPage"]);
        }

        if(paginador)
            this.util.cerrarLoading();
        console.log(res);
    });
    
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

colapsarInfoTabs(tipo)
{
  if(tipo == 1)
  {
    this.colapsadortablaposiciones = this.colapsadortablaposiciones== 1? 0:1;
  }
  if(tipo == 2)
  {
    this.colapsadorultimosencuentros = this.colapsadorultimosencuentros== 1? 0:1;
  }
  if(tipo == 3)
  {
    this.colapsadorproximosencuentros = this.colapsadorproximosencuentros== 1? 0:1;
  }

}

}


