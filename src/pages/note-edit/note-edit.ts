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
  private emojiMapping = {
    'analytical' : '🤔',
    'confident': '👌',
    'tentative':'🙄',
    'sadness': '😢',
    'anger': '😡',
    'fear': '😧',
    'joy' : '😂',
  }

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
          .then(updatedNote => {

            // do not overwrite the content text
            // it's text might already been updated by 
            // the user before this callback returns
            this.note.tone = updatedNote.tone ;
            this.note._id = updatedNote._id;

          })
      });
  }

}
