import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TooltipsModule } from 'ionic-tooltips';
import { CustomModule } from '../custom/custom.module';

@NgModule({
  imports: [
    CommonModule,
    CustomModule,
    FormsModule,
    IonicModule,
    TooltipsModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
