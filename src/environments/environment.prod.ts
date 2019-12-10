export const environment = {
  production: true,
  url : "http://api.asociaciondefutbol.cl",
  urlProduccion : "http://www.asociaciondefutbol.cl",
  bd: "asociacion_db.db",
  tabla: "tb_asociacion",
  //todos estos deben cambiar de acuerdo a la asociacion
  idAsociacion:1,
  nombreStore: "asociacionfutbol",
  unica : 1,//debe ser uno si se requiere para una sola asociacion
  general:{
    appId: "f8b0a9b9-77bf-4c5d-8060-b8e5809043a2",//debe ser el appid de onesignal
    googleProjectNumber:"59942433187",//es el id del proyecto en google,
    googleAnaliticsId:"UA-73444973-2"
  },
  painesur:{
    appId: "98493ec6-c30a-4063-8f5a-1999f05b3516",//debe ser el appid de onesignal
    googleProjectNumber:"113032492377"//es el ID del remitente del proyecto en google
  },
  coelemu:{
    appId: "",//debe ser el appid de onesignal
    googleProjectNumber:"212512794577"//es el ID del remitente del proyecto en google
  },
  admob:{
    bannerId:"ca-app-pub-5142839475072312/1180070136",
    interstitialId:"ca-app-pub-5142839475072312/4276156705"
  }
};
