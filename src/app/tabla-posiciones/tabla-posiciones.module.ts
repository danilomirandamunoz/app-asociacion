import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TablaPosicionesPage } from './tabla-posiciones.page';
import { TooltipsModule } from 'ionic-tooltips';

const routes: Routes = [
  {
    path: '',
    component: TablaPosicionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
       TooltipsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [TablaPosicionesPage]
})
export class TablaPosicionesPageModule {}
