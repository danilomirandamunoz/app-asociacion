import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResultadosPage } from './resultados.page';
import { TooltipsModule } from 'ionic-tooltips';

const routes: Routes = [
  {
    path: '',
    component: ResultadosPage
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
  declarations: [ResultadosPage]
})
export class ResultadosPageModule {}
