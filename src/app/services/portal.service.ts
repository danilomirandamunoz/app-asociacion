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

 async cargarAsociacion()
 {
  await this.storage.get('asociacion').then((val) => {
    console.log("val", val);
    if(val)
    {
      this.idAsociacion = val;
    }
  });
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

async obtenerJugadores(id, texto)
{
    await this.cargarAsociacion();
    return await this.http.get(`${this.url}/api/asociacion/getJugadores/${this.idAsociacion}/${texto}`).toPromise();
     
}
  
}
