import { Component, OnInit } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {

  texto;
  jugadores;
  paginador: string;

  constructor(private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController) { }

  ngOnInit() {
  }

  async cargarJugadores(pagina) {
    console.log("carga de jugadores");
    const res = await this.portalService.obtenerJugadores(pagina, this.texto);
    if(res["Data"]) 
    {
      console.log("jugadores", res);

      this.jugadores = res["Data"];
      this.paggingTemplate(res["TotalPages"],res["CurrentPage"]);
    }
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
