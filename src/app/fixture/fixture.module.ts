import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FixturePage } from './fixture.page';
import { TooltipsModule } from 'ionic-tooltips';

const routes: Routes = [
  {
    path: '',
    component: FixturePage
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
  declarations: [FixturePage]
})
export class FixturePageModule {}
