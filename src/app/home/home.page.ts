import { Component } from '@angular/core';
import { PortalService } from '../services/portal.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { InicioPage } from '../modal/inicio/inicio.page';
import { NoticiaPage } from '../modal/noticia/noticia.page';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

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
  loadingnoticias;
  paginadorArray;

  databaseObj: SQLiteObject; // Database instance object
  name_model:string = ""; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = "asociacion_db.db"; // DB name
  readonly table_name:string = "tb_asociacion"; // Table name

  constructor(
    private portalService : PortalService,
    public loadingController: LoadingController,
    private sanitizer : DomSanitizer,
    private storage: Storage,
    public modalController: ModalController,
    private sqlite: SQLite) {

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
      //this.noticias = res["noticias"];
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

createDB() {
  this.sqlite.create({
    name: this.database_name,
    location: 'default'
  })
    .then((db: SQLiteObject) => {
      this.databaseObj = db;
      console.log("base de datos creada");
      //alert('freaky_datatable Database Created!');
    })
    .catch(e => {
      console.log("error", e);

    });
}

createTable() {
  this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, Name varchar(255))', [])
    .then(() => {
      alert('Table Created!');
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
}

insertRow() {
  this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (Name) VALUES ("' + this.name_model + '")', [])
    .then(() => {
      //alert('Row Inserted!');
      console.log("guardado");
      this.getRows();
    })
    .catch(e => {
      //alert("error " + JSON.stringify(e));
      console.log("error", e);
    });
}

getRows() {
  this.databaseObj.executeSql("SELECT * FROM " + this.table_name, [])
    .then((res) => {
      this.row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.row_data.push(res.rows.item(i));
        }
      }
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
}

}
