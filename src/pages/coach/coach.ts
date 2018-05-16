import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Login } from '../login/login';

@Component({
  selector: 'coach',
  templateUrl: 'coach.html'
})
export class Coach {

  constructor(
    private modalCtrl: ModalController
  ) {

  }

  logout() {
    // this.modalCtrl.create(Login).present();
  }

}