import { Component } from '@angular/core';
import { NavController, ModalController, App, AlertController } from 'ionic-angular';

import { NoteEdit } from '../note-edit/note-edit';
import { Notes } from '../../providers/notes';
import { Note } from '../../models/note';
import { Login } from '../login/login';
import { TouchID } from '@ionic-native/touch-id';

@Component({
  selector: 'diary',
  templateUrl: 'diary.html'
})
export class Diary {
  private notes: Promise<Note[]>

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private app: App,
    private notesService: Notes,
    private touchId: TouchID
  ) {
    this.notes = this.notesService.getAll();
  }

  edit(note: Note): void {
    this.app.getRootNav().push(NoteEdit, { note: note })
  }

  delete(note: Note): void {
    this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel delete note');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete note', note);
            this.notesService.delete(note);

          }
        }
      ]
    }).present();;

  }

  ionViewDidLoad() {
    let self = this;
    self.modalCtrl.create(Login).present()
    document.addEventListener("pause", function () {
      console.log('App paused: to background!')
      self.modalCtrl.create(Login).present();
    }, true);
  }
}