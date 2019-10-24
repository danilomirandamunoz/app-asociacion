import { Component } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { InicioPage } from '../modal/inicio/inicio.page';
import { NoticiaPage } from '../modal/noticia/noticia.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 4000,
    },
  };

  urlP = environment.urlProduccion;
  loading;
  asociacion;
  noticias;
  tabla;
  proximosEncuentros;
  ultimosEncuentros;
  estadios;
  galerias;
  paginador: string;

  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    private storage: Storage,
    public modalController: ModalController) {

      this.storage.remove('asociacion');
     this.cargarPagina();
      
  }

   cargarPagina()
  {
    this.storage.get('asociacion').then((val) => {
      console.log("val", val);
      if(val)
      {
        this.presentLoading();
        this.asociacion = val;
        console.log(this.asociacion);       
        this.cargarHome1();
      }
      else
      {
        console.log("cargando modal");
        this.loadModal();
      }
    });
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  async cargarHome1() {

    const res = await this.portalService.obtenerHome1();

    if(res["Codigo"] == 0)
    {
      this.noticias = res["noticias"];
      this.tabla = res["tabla"];

      this.cargarHome2();
    }
    this.loading.dismiss();
    console.log("resultado de la prueba", res);
  }

  async cargarHome2() {

    

    const res = await this.portalService.obtenerHome2();
    if(res["Codigo"] == 0)
    {
      this.proximosEncuentros = res["proximosEncuentros"];
      this.ultimosEncuentros = res["ultimosEncuentros"];
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
    this.presentLoading();
  console.log("carga de noticias");
  const res = await this.portalService.obtenerNoticias(pagina);
  //const res = await this.portalService.obtenerJugadores(pagina, this.texto);
  if(res["Data"]) 
  {
    console.log("noticias", res);

    this.noticias = res["Data"];
    this.paggingTemplate(res["TotalPages"],res["CurrentPage"]);
  }
  this.loading.dismiss();
  console.log(res);
}

paggingTemplate(totalPage, currentPage)
{
    var template = "";
    var TotalPages = totalPage;
    var CurrentPage = currentPage;
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

        //PageNumberArray[0] = firstPagePagination;
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

    template = '<p class="pagination-count">' + CurrentPage + ' de ' + TotalPages + ' páginas</p>';

    if (currentPage == 1)
    {
        template = template + '<ul class="pagination">' +
        //'<li class="page-item disabled"><span class="page-link" href="#" onclick="GetPageData(' + FirstPage + ')"><i class="fa fa-fast-backward" aria-hidden="true"></i></span></li>' +
        '<li class="page-item disabled"><span class="page-link" href="#" onclick="cargarNoticias(' + BackwardOne + ')"><i class="fa fa-step-backward" aria-hidden="true"></i></span></li>'
        ;
    }
    else
    {
        template = template + '<ul class="pagination">' +
        //'<li class="page-item"><span class="page-link" href="#" onclick="GetPageData(' + FirstPage + ')"><i class="fa fa-fast-backward" aria-hidden="true"></i></span></li>' +
        '<li class="page-item"><span class="page-link" href="#" onclick="cargarNoticias(' + BackwardOne + ')"><i class="fa fa-step-backward" aria-hidden="true"></i></span></li>'
        ;
    }



    var numberingLoop = "";
    for (var i = 0; i < PageNumberArray.length; i++)
    {

        if (currentPage == PageNumberArray[i])
        {
            numberingLoop = numberingLoop +
            '<li class="page-item active"><span class="page-link" onclick="cargarNoticias(' + PageNumberArray[i] + ')" href="#">' + PageNumberArray[i] + '</span></li>';
        }
        else
        {
            numberingLoop = numberingLoop +
            '<li class="page-item "><span class="page-link" onclick="cargarNoticias(' + PageNumberArray[i] + ')" href="#">' + PageNumberArray[i] + '</span></li>';
        }
    }

    if (totalPage == currentPage)
    {
        template = template + numberingLoop +
        '<li class="page-item disabled"><span class="page-link" href="#" onclick="cargarNoticias(' + ForwardOne + ')"><i class="fa fa-step-forward" aria-hidden="true"></i></span></li>';
        //'<li class="page-item disabled"><span class="page-link" href="#" onclick="GetPageData(' + LastPage + ')"><i class="fa fa-fast-forward" aria-hidden="true"></i></i></span></li></ul>'
    }
    else
    {
        template = template + numberingLoop +
        '<li class="page-item"><span class="page-link" href="#" onclick="cargarNoticias(' + ForwardOne + ')"><i class="fa fa-step-forward" aria-hidden="true"></i></span></li>';
        //'<li class="page-item"><span class="page-link" href="#" onclick="GetPageData(' + LastPage + ')"><i class="fa fa-fast-forward" aria-hidden="true"></i></i></span></li></ul>'
    }

    template = template + '</ul>';
    this.paginador =template;
}

}
