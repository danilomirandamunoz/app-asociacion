import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-tabla-inicio',
  templateUrl: './skeleton-tabla-inicio.component.html',
  styleUrls: ['./skeleton-tabla-inicio.component.scss'],
})
export class SkeletonTablaInicioComponent implements OnInit {

  skeletons = new Array(10);

  constructor() { }

  ngOnInit() {}

}
