// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // url : "http://apitesting.asociaciondefutbol.cl",
  // urlProduccion : "http://testing.asociaciondefutbol.cl",
  url : "http://api.asociaciondefutbol.cl",
  urlProduccion : "http://www.asociaciondefutbol.cl",
  nombrePrimeraSession: "iniciado",
  unica : 0,//debe ser uno si se requiere para una sola asociacion
  general:{
    appId: "f8b0a9b9-77bf-4c5d-8060-b8e5809043a2",//debe ser el appid de onesignal
    googleProjectNumber:"59942433187",//es el id del proyecto en google,
    googleAnaliticsId:"UA-73444973-2",
    idAsociacion:1,//general
    nombreStore: "asociacionfutbolprueba",
  },
  // general:{//painesur
  //   appId: "98493ec6-c30a-4063-8f5a-1999f05b3516",//debe ser el appid de onesignal
  //   googleProjectNumber:"113032492377",//es el ID del remitente del proyecto en google
  //   idAsociacion:11,//painesur
  //   nombreStore: "asociacionfutbolpainesur",
  // },
  // general:{//coelemu
  //   appId: "",//debe ser el appid de onesignal
  //   googleProjectNumber:"212512794577",//es el ID del remitente del proyecto en google
  //    idAsociacion:7,//coelemu
  //    nombreStore: "asociacionfutbolcoelemu",
  // }
  

};

//generico
//appid:

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
