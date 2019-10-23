import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  url = environment.url;
  idAsociacion:number;

constructor(private http: HttpClient,private storage: Storage) 
{
 

 }

 async storage_ObtenerAsociacion()
 {

  return await this.storage.get('asociacion').then((val) => {
    console.log("val", val);
    if(val)
    {
      console.log("val encontrado");
      return val;
    }
    else
    {
      console.log("val no encontrado");
      return null;
    }
  });


 }

 async cargarAsociacion()
 {
  await this.storage.get('asociacion').then((val) => {
    console.log("val", val);
    if(val)
    {
      this.idAsociacion = val.Id;

    }
    else
    {
      this.idAsociacion = 1;
    }
  });

 }

 async obtenerAsociacion()
 {
  await this.cargarAsociacion();
  console.log("idasociacion", this.idAsociacion);
    return await this.http.get(`${this.url}/api/asociacion/getAsociacion/${this.idAsociacion}`).toPromise();
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
    return await this.http.get(`${this.url}/api/asociacion/getNoticias/${this.idAsociacion}/${pagina}`).toPromise();
     
}
  
}
