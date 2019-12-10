import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/clases/Notificacion';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

notificaciones : Notificacion[];

  constructor(private store: StoreService) 
  { 

  }

  ngOnInit() {
  }

  async cargarNotificaciones()
  {
    this.notificaciones = await this.store.get("listado_notificaciones");
    
  }

}
