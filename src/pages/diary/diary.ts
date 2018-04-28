import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NoteEdit } from '../note-edit/note-edit';

@Component({
  selector: 'diary',
  templateUrl: 'diary.html'
})
export class Diary {

  constructor(public navCtrl: NavController) {
  
  }

  edit(note):void {
    this.navCtrl.push(NoteEdit);
  }

}
