import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";

import { Notes } from '../../providers/notes';
import { Note } from '../../models/note';

@Component({
  selector: 'note-edit',
  templateUrl: 'note-edit.html'
})
export class NoteEdit {
  private searchUpdated: Subject<string> = new Subject<string>();
  private isChanging: Boolean = false;
  private isSaved: Boolean = false;
  private note: Note = {};

  constructor(
    public navCtrl: NavController,
    public notesService: Notes,
    public navParams: NavParams
  ) {
    this.initInputDebounceForSaving();
    let note = navParams.get('note');
    if (note) {
      this.note = note;
    } else {
      this.note.createdAt = new Date();
    }
  }

  onSearchType(value: string) {
    this.searchUpdated.next(value);
    this.isChanging = true;
  }

  private initInputDebounceForSaving() {

    this.searchUpdated.asObservable()
      .debounceTime(600)
      .subscribe(debouncedEvent => {
        this.isChanging = false;
        this.isSaved = true;
        this.note.editedAt = new Date();
        this.notesService.save(this.note)
          .then(noteId => {
            this.note._id = noteId;
          })
      });
  }

}
