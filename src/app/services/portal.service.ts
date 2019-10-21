import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  url = environment.url;

constructor(private http: HttpClient) { }


obtenerHome1()
{
    return this.http.get(`${this.url}/api/asociacion/homeparte1/1`)
      .pipe(
        tap(res => {
        }),
        catchError(e => {
          console.log(e);

          throw new Error(e);
        })
      );    
}

obtenerHome2()
{
    return this.http.get(`${this.url}/api/asociacion/homeparte2/1`)
      .pipe(
        tap(res => {
        }),
        catchError(e => {
          console.log(e);

          throw new Error(e);
        })
      );    
}

obtenerHome3()
{
    return this.http.get(`${this.url}/api/asociacion/homeparte3/1`)
      .pipe(
        tap(res => {
        }),
        catchError(e => {
          console.log(e);

          throw new Error(e);
        })
      );    
}

obtenerInstitucion()
{
    return this.http.get(`${this.url}/api/asociacion/institucion/1`)
      .pipe(
        tap(res => {
        }),
        catchError(e => {
          console.log(e);

          throw new Error(e);
        })
      );    
}

obtenerClubes()
{
    return this.http.get(`${this.url}/api/asociacion/clubes/1`)
      .pipe(
        tap(res => {
        }),
        catchError(e => {
          console.log(e);

          throw new Error(e);
        })
      );    
}

obtenerDetalleClub(id)
{
    return this.http.get(`${this.url}/api/asociacion/clubes/detalle/1/${id}`)
      .pipe(
        tap(res => {
        }),
        catchError(e => {
          console.log(e);

          throw new Error(e);
        })
      );    
}

obtenerJugadoresClub(id, pagina, texto)
{
    return this.http.get(`${this.url}/api/asociacion/club/getJugadores/1/${id}/${pagina}/${texto}`)
      .pipe(
        tap(res => {
        }),
        catchError(e => {
          console.log(e);

          throw new Error(e);
        })
      );    
}
  
}
