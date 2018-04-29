import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    public notesService: Notes
  ) {
    this.initInputDebounceForSaving();
  }

  onSearchType(value: string) {
    this.searchUpdated.next(value);
    this.isChanging = true;
  }

  private initInputDebounceForSaving() {

    this.searchUpdated.asObservable()
      .debounceTime(400)
      .subscribe(debouncedEvent => {
        this.isChanging = false;
        this.isSaved = true;
        console.log(this.note)
      });

  }

}
