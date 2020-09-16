import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private storage: Storage) 
  {

   }

   async set(nombre, item)
   {
      await this.storage.set(environment.general.nombreStore +"__"+ nombre, item);
   }

   async get(nombre)
   {
    return await this.storage.get(environment.general.nombreStore +"__"+nombre).then((val) => {
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
}
