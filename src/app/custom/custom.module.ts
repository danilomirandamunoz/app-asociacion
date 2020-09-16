import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonTablaInicioComponent } from '../components/skeletons/skeleton-tabla-inicio/skeleton-tabla-inicio.component';



@NgModule({
  declarations: [SkeletonTablaInicioComponent],
  imports: [
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:[SkeletonTablaInicioComponent]
})
export class CustomModule { }
