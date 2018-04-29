import { Component } from '@angular/core';
import { NavController, ModalController, App } from 'ionic-angular';

import { NoteEdit } from '../note-edit/note-edit';

@Component({
  selector: 'diary',
  templateUrl: 'diary.html'
})
export class Diary {

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public app: App,
  ) {
  
  }


  edit(note):void {
    // this.navCtrl.push(NoteEdit);
    this.app.getRootNav().push(NoteEdit)
  }

}
