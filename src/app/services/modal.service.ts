import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modals :HTMLIonModalElement[] = [];
  
  constructor(private modalController: ModalController,) { }

  async addModal(modal:HTMLIonModalElement)
  {
    await this.modals.push(modal);
  }

  async dismissAll()
  {
    await this.modals.forEach(element => {
      if(element)
      {
        element.dismiss();
      }
    });
  }

}
