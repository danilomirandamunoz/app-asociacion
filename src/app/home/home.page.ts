import { Component } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController, Platform, PopoverController } from '@ionic/angular';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { InicioPage } from '../modal/inicio/inicio.page';
import { NoticiaPage } from '../modal/noticia/noticia.page';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { BdService } from '../services/bd.service';
import { StoreService } from '../services/store.service';
import { UtilidadesService } from '../services/utilidades.service';
import { NombreEquipoPage } from '../popovers/nombre-equipo/nombre-equipo.page';
import { NombreComponent } from '../popovers/nombre/nombre.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    initialSlide: 0,
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

  constructor(
    private portalService : PortalService,
    private sanitizer : DomSanitizer,
    private storage: Storage,
    public modalController: ModalController,
    private sqlite: SQLite,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private store: StoreService,
    public util: UtilidadesService,
    public popoverController: PopoverController) {

     this.cargarPagina();
     this.splashScreen.hide();
      
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

  ngOnInit() {
    this.util.mostrarLoading();
  }

   async cargarPagina()
  {
    if(environment.unica == 1)
    {
      let resAso = await this.portalService.obtenerAsociacionUnica(environment.idAsociacion);
      console.log("resaso", resAso);
      if(resAso["Codigo"] == 0)
      {
        await this.store.set(environment.nombreStore, resAso["Asociacion"]);
      }
    }



    var res = await this.store.get(environment.nombreStore);

    if(res!= null)
    {
      
      this.asociacion = res;
      console.log(this.asociacion);       
      this.cargarHome1();
    }
    else{
      this.loadModal();
    }
  }

  async doRefresh(event) {
    console.log('Begin async operation');

    await this.cargarHome1();
    event.target.complete();
  }

  async loadModal()
  {
    const modal = await this.modalController.create({
      component: InicioPage
    });
    modal.onDidDismiss()
      .then((data) => {
        this.cargarPagina();
    });
    return await modal.present();
  }

  async cargarHome1() {

    var notDest = await this.portalService.obtenerNoticiasDestacadas();

    console.log("noticias destacadas", notDest);
    if(notDest["Codigo"] == 0)
    {
      this.noticiasdestacadas = notDest["noticias"];


  
    }

    const res = await this.portalService.obtenerHome1();

    if(res["Codigo"] == 0)
    {
      //this.noticias = res["noticias"];
      this.tabla = res["tabla"];

      this.cargarHome2();
    }
    this.load=true;
    this.util.cerrarLoading();
    console.log("resultado de la prueba", res);
  }

  async cargarHome2() {

    

    const res = await this.portalService.obtenerHome2();
    if(res["Codigo"] == 0)
    {
      let ultimosResultados = res["ultimosEncuentros"];
      let proximosEncuentros = res["proximosEncuentros"];

      if(ultimosResultados)
      {
        for (let index = 0; index < ultimosResultados.length; index++) {
          this.fechaUltimosResultados = ultimosResultados[index].NombreFecha;
          
        }
      }

      if(proximosEncuentros)
      {
        for (let index = 0; index < proximosEncuentros.length; index++) {
          this.fechaProximosEncuentros = proximosEncuentros[index].NombreFecha;
          
        }
      }



      this.proximosEncuentros = proximosEncuentros;
      this.ultimosEncuentros = ultimosResultados;
      this.cargarHome3();
      this.cargarNoticias(1);
    }
  }

  async cargarHome3() {
    const res = await this.portalService.obtenerHome3();
    if(res["Codigo"] == 0)
    {
        this.estadios = res["estadios"];
        console.log("estadios", this.estadios);    
    }
  }

  async mostrarNoticia(item)
  {
    const modal = await this.modalController.create({
      component: NoticiaPage,
      componentProps: {
        'noticia': item
      }
    });
    return await modal.present();
  }

  async cargarNoticias(pagina) {

    this.noticias =[];
    this.loadingnoticias = true;
  console.log("carga de noticias");
  const res = await this.portalService.obtenerNoticias(pagina);
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Data"]) 
  {
    console.log("noticias", res);

    this.noticias = res["Data"];
    this.loadingnoticias = null;
    this.paggingTemplate(res["TotalPages"],res["CurrentPage"]);
  }

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


