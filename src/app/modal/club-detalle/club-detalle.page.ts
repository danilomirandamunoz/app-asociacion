import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, ModalController } from '@ionic/angular';
import { PortalService } from 'src/app/services/portal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-club-detalle',
  templateUrl: './club-detalle.page.html',
  styleUrls: ['./club-detalle.page.scss'],
})
export class ClubDetallePage implements OnInit {


  loading;
  equipo;
  directiva;
  urlP = environment.urlProduccion;
  idClub;

  tabGeneral = false;
  tabJugadores= false;
  tabFixture= false;
  tabResultados= false;
  jugadores: [];
  texto: string;
  paginador: string;

  constructor(navParams: NavParams, private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController) 
  {
    this.presentLoading();
    console.log();
    this.idClub = navParams.get('id');
    this.cargar(this.idClub);
  }

  ngOnInit() {
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  cargar(id)
  {
    this.portalService.obtenerDetalleClub(id).subscribe(res => {
      
      if(res["Codigo"] == 0)
          {
            console.log(res);
            this.equipo = res["equipo"];
            this.directiva = res["directiva"];
            this.tabGeneral = true;
          }
      this.loading.dismiss();
          
    });
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
          if(this.jugadores.length==0)
          {
            this.cargarJugadores(1);
          }
          
          
        break;
        case 3:
          this.tabFixture = true;
          this.cargarFixture();
        break;
        case 4:
          this.tabResultados = true;
          this.cargarResultados();
        break;
    
      default:
        break;
    }
  }
  cargarResultados() {

  }
  cargarFixture() {

  }
  cargarJugadores(pagina) {

    this.portalService.obtenerJugadoresClub(this.idClub,pagina, this.texto).subscribe(res => {
      
      if(res["Data"])
          {
            console.log(res);

            this.jugadores = res["Data"];
            this.paggingTemplate(res["TotalPages"],res["CurrentPage"]);
          }
          console.log(res);
    });
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
          '<li class="page-item disabled"><span class="page-link" href="#" onclick="GetPageData(' + BackwardOne + ')"><i class="fa fa-step-backward" aria-hidden="true"></i></span></li>'
          ;
      }
      else
      {
          template = template + '<ul class="pagination">' +
          //'<li class="page-item"><span class="page-link" href="#" onclick="GetPageData(' + FirstPage + ')"><i class="fa fa-fast-backward" aria-hidden="true"></i></span></li>' +
          '<li class="page-item"><span class="page-link" href="#" onclick="GetPageData(' + BackwardOne + ')"><i class="fa fa-step-backward" aria-hidden="true"></i></span></li>'
          ;
      }



      var numberingLoop = "";
      for (var i = 0; i < PageNumberArray.length; i++)
      {

          if (currentPage == PageNumberArray[i])
          {
              numberingLoop = numberingLoop +
              '<li class="page-item active"><span class="page-link" onclick="GetPageData(' + PageNumberArray[i] + ')" href="#">' + PageNumberArray[i] + '</span></li>';
          }
          else
          {
              numberingLoop = numberingLoop +
              '<li class="page-item "><span class="page-link" onclick="GetPageData(' + PageNumberArray[i] + ')" href="#">' + PageNumberArray[i] + '</span></li>';
          }
      }

      if (totalPage == currentPage)
      {
          template = template + numberingLoop +
          '<li class="page-item disabled"><span class="page-link" href="#" onclick="GetPageData(' + ForwardOne + ')"><i class="fa fa-step-forward" aria-hidden="true"></i></span></li>';
          //'<li class="page-item disabled"><span class="page-link" href="#" onclick="GetPageData(' + LastPage + ')"><i class="fa fa-fast-forward" aria-hidden="true"></i></i></span></li></ul>'
      }
      else
      {
          template = template + numberingLoop +
          '<li class="page-item"><span class="page-link" href="#" onclick="GetPageData(' + ForwardOne + ')"><i class="fa fa-step-forward" aria-hidden="true"></i></span></li>';
          //'<li class="page-item"><span class="page-link" href="#" onclick="GetPageData(' + LastPage + ')"><i class="fa fa-fast-forward" aria-hidden="true"></i></i></span></li></ul>'
      }

      template = template + '</ul>';
      this.paginador =template;
  }

}