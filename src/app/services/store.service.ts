import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private storage: Storage) 
  {

   }

   async set(nombre, item)
   {
      await this.storage.set(nombre, item);
   }

   async get(nombre)
   {
    return await this.storage.get(nombre).then((val) => {
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
