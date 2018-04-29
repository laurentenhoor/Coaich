import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';

import { Goals } from '../goals/goals';
import { Coach } from '../coach/coach';
import { Diary } from '../diary/diary';

import { Login } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Diary;
  tab2Root = Goals;
  tab3Root = Coach;
  tab4Root = Login;

  constructor(public modalCtrl: ModalController) {

    // let self = this;
    // self.modalCtrl.create(Login).present();

    // document.addEventListener("pause", function () {
    //     console.log('App paused: to background!')
    //     self.modalCtrl.create(Login).present();
    // }, true);

  }
}
