import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NombreEquipoPage } from './nombre-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: NombreEquipoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NombreEquipoPage]
})
export class NombreEquipoPageModule {}
