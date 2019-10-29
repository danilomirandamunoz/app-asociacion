import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, ModalController } from '@ionic/angular';
import { PortalService } from 'src/app/services/portal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from 'src/app/services/utilidades.service';

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

  constructor(navParams: NavParams, private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService) 
  {
    this.util.mostrarLoading();
    this.idClub = navParams.get('id');
    this.cargar(this.idClub);
    this.cargarJugadores(1);
    this.cargarFixture();
    this.cargarResultados();
  }

  ngOnInit() {
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
      console.log("resultados", res);

      const aux = res["resultados"];

      aux.forEach(element => {
        element.IdEstado = 1;
      });

      this.resultados = aux;
    }
    console.log(res);
  }

  async cargarFixture() {
    console.log("carga de fixture");
    const res = await this.portalService.obtenerFixtureClub(this.idClub);
    if(res["Codigo"] == 0) 
    {
      console.log("fixture", res);

      this.fixture = res["fixture"];
    }
    console.log(res);
  }

  async cargarJugadores(pagina) {
    console.log("carga de jugadores");
    const res = await this.portalService.obtenerJugadoresClub(this.idClub,pagina, this.texto);
    if(res["Data"]) 
    {
      console.log("jugadores", res);

      this.jugadores = res["Data"];
      this.paggingTemplate(res["TotalPages"],res["CurrentPage"]);
    }
    console.log(res);
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