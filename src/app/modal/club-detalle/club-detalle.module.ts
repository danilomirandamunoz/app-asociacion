import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClubDetallePage } from './club-detalle.page';
import { TooltipsModule } from 'ionic-tooltips';

const routes: Routes = [
  {
    path: '',
    component: ClubDetallePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TooltipsModule.forRoot(),
  ],
  declarations: [ClubDetallePage]
})
export class ClubDetallePageModule {}
