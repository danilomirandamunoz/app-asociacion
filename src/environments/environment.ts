// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url : "http://api.asociaciondefutbol.cl",
  urlProduccion : "http://www.asociaciondefutbol.cl",
  bd: "asociacion_db.db",
  tabla: "tb_asociacion",
  //todos estos deben cambiar de acuerdo a la asociacion
  idAsociacion:11,
  nombreStore: "asociacion",
  unica : 0,//debe ser uno si se requiere para una sola asociacion
  appId: "f8b0a9b9-77bf-4c5d-8060-b8e5809043a2",//debe ser el appid de onesignal
  googleProjectNumber:"59942433187"//es el id del proyecto en google

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
