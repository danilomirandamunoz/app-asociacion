import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BdService } from './bd.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  url = environment.url;
  idAsociacion:number;

  databaseObj: SQLiteObject; // Database instance object
  name_model:string = ""; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = environment.bd; // DB name
  readonly table_name:string = environment.tabla; // Table name

constructor(
  private http: HttpClient,
  private storage: Storage, 
  private platform: Platform, 
  private sqlite: SQLite, 
  private bd : BdService,
  private store: StoreService) 
{
  //this.cargarAsociacion();

 }

 async storage_ObtenerAsociacion()
 {
    return await this.store.get(environment.nombreStore);
 }

 async cargarAsociacion()
 {
    var item = await this.store.get(environment.nombreStore);
    console.log("asociacion portal", item);
  if(item!=null)
  {
    this.idAsociacion = item.Id;
  }
    
 }



 async obtenerAsociacion()
 {
    await this.cargarAsociacion();
    console.log("idasociacion", this.idAsociacion);
    return await this.http.get(`${this.url}/api/asociacion/getAsociacion/${this.idAsociacion}`).toPromise();
 }

 async obtenerAsociacionUnica(idAsociacion)
 {
    return await this.http.get(`${this.url}/api/asociacion/getAsociacion/${idAsociacion}`).toPromise();
 }

 async obtenerAsociacionesDisponibles()
 {
    await this.cargarAsociacion();
    console.log("idasociacion", this.idAsociacion);
    return await this.http.get(`${this.url}/api/asociacion/getAsociaciones`).toPromise();
 }




async obtenerHome1()
{

  await this.cargarAsociacion();
  console.log("idasociacion", this.idAsociacion);
    return await this.http.get(`${this.url}/api/asociacion/homeparte1/${this.idAsociacion}`).toPromise(); 
}

async obtenerHome2()
{
  await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/homeparte2/${this.idAsociacion}`).toPromise();   
}

async obtenerHome3()
{
  await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/homeparte3/${this.idAsociacion}`).toPromise();
    
}

async obtenerInstitucion()
{
  await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/institucion/${this.idAsociacion}`).toPromise();
      // .pipe(
      //   tap(res => {
      //   }),
      //   catchError(e => {
      //     console.log(e);

      //     throw new Error(e);
      //   })
      // );    
}

async obtenerClubes()
{
  await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/clubes/${this.idAsociacion}`).toPromise();
     
}

async obtenerDetalleClub(id)
{
  await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/clubes/detalle/${this.idAsociacion}/${id}`).toPromise();
      
}

async obtenerJugadoresClub(id, pagina, texto)
{
  if(texto=="")
  {
    texto = "undefined";
  }
  await this.cargarAsociacion();
  return await this.http.get(`${this.url}/api/asociacion/club/getJugadores/${this.idAsociacion}/${id}/${pagina}/${texto}`).toPromise();
   
}

 async obtenerFixtureClub(id)
{
  await this.cargarAsociacion();

    return await this.http.get(`${this.url}/api/asociacion/club/getFixture/${this.idAsociacion}/${id}`).toPromise();   
}

async obtenerResultadosClub(id)
{
   await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/club/getResultados/${this.idAsociacion}/${id}`).toPromise();
     
}

async obtenerJugadores(pagina, texto)
{
  if(texto=="")
  {
    texto = "undefined";
  }
    await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/getJugadores/${this.idAsociacion}/${pagina}/${texto}`).toPromise();
     
}

async obtenerFixture()
{
    await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/getFixture/${this.idAsociacion}`).toPromise();
     
}

async obtenerResultados()
{
    await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/getResultados/${this.idAsociacion}`).toPromise();
     
}

async obtenerPosiciones()
{
    await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/getPosiciones/${this.idAsociacion}`).toPromise();
     
}

async obtenerSanciones()
{
    await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/getSanciones/${this.idAsociacion}`).toPromise();
     
}

async obtenerGalerias()
{
    await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/getGalerias/${this.idAsociacion}`).toPromise();
     
}

async obtenerNoticias(pagina)
{

    await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/getNoticias/${this.idAsociacion}/${pagina}/4`).toPromise();
     
}

async obtenerNoticiasDestacadas()
{

    await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/getNoticiasDestacadas/${this.idAsociacion}`).toPromise();
     
}
  
}
