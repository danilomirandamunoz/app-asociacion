import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BdService {
  database: SQLiteObject;
  databaseObj: SQLiteObject; // Database instance object
  name_model:string = ""; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = environment.bd; // DB name
  readonly table_name:string = environment.tabla; // Table name

  constructor(public sqlite: SQLite) {



   }


//    async createTables(){
//     try {

//         await this.database.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (Id INTEGER, Nombre varchar(500), Identificador varchar(4000), Direccion varchar(4000), Ciudad varchar(4000), Telefonos varchar(4000), Emails varchar(4000), Logo varchar(4000), QuienesSomos varchar(4000), Mision varchar(4000), Vision varchar(4000))', []);

//     }catch(e){
//         alert("Error creating tables!");
//     }


// }

// async getData()
// {
//   alert("getdata");
//   const res = await this.database.executeSql("SELECT * FROM " + this.table_name, []);
//   if (res.rows.length > 0) {
//       return res.rows.item(0);
//   }
//   else{
//     return null;
//   }

// }

// async getId()
// {
//   const res = await this.database.executeSql("SELECT * FROM " + this.table_name, []);
//   if (res.rows.length > 0) {
//     if (res.rows.length > 0) {
//       for (var i = 0; i < res.rows.length; i++) {
//         this.row_data.push(res.rows.item(i));
//         return res.rows.item(i).Id;
//       }
//     }
//   }
//   else{
//     return 0;
//   }
// }

}
