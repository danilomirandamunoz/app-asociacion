import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'institucion', loadChildren: './institucion/institucion.module#InstitucionPageModule' },
  { path: 'clubes', loadChildren: './clubes/clubes.module#ClubesPageModule' },
  { path: 'jugadores', loadChildren: './jugadores/jugadores.module#JugadoresPageModule' },
  { path: 'fixture', loadChildren: './fixture/fixture.module#FixturePageModule' },
  { path: 'resultados', loadChildren: './resultados/resultados.module#ResultadosPageModule' },
  { path: 'tabla-posiciones', loadChildren: './tabla-posiciones/tabla-posiciones.module#TablaPosicionesPageModule' },
  { path: 'sanciones', loadChildren: './sanciones/sanciones.module#SancionesPageModule' },
  { path: 'galeria', loadChildren: './galeria/galeria.module#GaleriaPageModule' },
  { path: 'contacto', loadChildren: './contacto/contacto.module#ContactoPageModule' },
  { path: 'club-detalle', loadChildren: './modal/club-detalle/club-detalle.module#ClubDetallePageModule' },  { path: 'inicio', loadChildren: './modal/inicio/inicio.module#InicioPageModule' },
  { path: 'noticia', loadChildren: './modal/noticia/noticia.module#NoticiaPageModule' },
  { path: 'galeria-detalle', loadChildren: './modal/galeria-detalle/galeria-detalle.module#GaleriaDetallePageModule' },
  { path: 'nombre-equipo', loadChildren: './popovers/nombre-equipo/nombre-equipo.module#NombreEquipoPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
