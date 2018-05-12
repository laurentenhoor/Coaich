import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";

import { Notes } from '../../providers/notes';
import { Note } from '../../models/note';
import { updateDate } from 'ionic-angular/util/datetime-util';

@Component({
  selector: 'note-edit',
  templateUrl: 'note-edit.html'
})
export class NoteEdit {
  private searchUpdated: Subject<string> = new Subject<string>();
  private isChanging: Boolean = false;
  private isSaved: Boolean = false;
  private note: Note = {};
  private loadingTone: Boolean = false;
  private changedAndNotAnalyzedYet: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public notesService: Notes,
    public navParams: NavParams
  ) {
    this.initInputDebounceForSaving();
    let note = navParams.get('note');
    if (note) {
      this.notesService.getById(note._id).then(note => this.note=note);
    } else {
      this.note.createdAt = new Date();
    }
  }

  onSearchType(value: string) {
    this.searchUpdated.next(value);
    this.isChanging = true;
    this.changedAndNotAnalyzedYet = true;
  }

  ionViewWillLeave() {
    if (this.changedAndNotAnalyzedYet) {
      this.analyze();
    }
  }

  analyze() {
    this.changedAndNotAnalyzedYet = false;
    this.loadingTone = true;
    this.notesService.analyzeTone(this.note).then(updatedNote => {
      console.log('received updated tone', updatedNote)
      this.note.tone = updatedNote.tone;
      this.loadingTone = false;
    })
  }

  private initInputDebounceForSaving() {
    this.searchUpdated.asObservable()
      .debounceTime(600)
      .subscribe(debouncedEvent => {

        this.isChanging = false;
        this.isSaved = true;
        this.note.editedAt = new Date();

        this.notesService.save(this.note)
          .then(updatedNote => {
            // do not overwrite the content text
            // it's text might already been updated by 
            // the user before this callback returns
            this.note._id = updatedNote._id;
          })
      });
  }

}
