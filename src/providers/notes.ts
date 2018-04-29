import { Injectable, NgZone } from '@angular/core';
import { Note } from '../models/note';
import PouchDB from 'pouchdb';

@Injectable()
export class Notes {
    data: Note[];
    localDb: any;
    // remoteDb: any;

    constructor(zone: NgZone) {

        this.localDb = new PouchDB('notes');
        // this.remoteDb = 'http://ec2-34-239-163-2.compute-1.amazonaws.com:5984/notes';
        // this.localDb.replicate.to(this.remoteDb, {
        //     live: true,
        //     retry: true,
        //     continuous: true,
        // });
    }

    getNotes(): Promise<Note[]> {
        if (this.data) {
            return new Promise(resolve=> {resolve(this.data)});
        }

        return new Promise(resolve => {

            this.localDb.allDocs({
                include_docs: true
            }).then((result) => {

                this.data = [];
                let docs = result.rows.map((row) => {
                    // console.log(row)
                    this.data.push(row.doc);
                });
                resolve(this.data);

                this.localDb.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
                    this.handleChange(change);
                });

            }).catch((error) => {
                console.error(error);
            });

        });
    }

    createNote(note:Note) {
        this.localDb.post(note).then((result) => {
            console.log('createNote', JSON.stringify(result));
        }).catch((err) => {
            console.error(JSON.stringify(err));
        });
    }

    updateNote(note:Note) {
        this.localDb.put(note).catch((err) => {
            console.error(err);
        });

    }

    deleteNote(note:Note) {
        this.localDb.remove(note).catch((err) => {
            console.error(err);
        });
        this.getNotes();
    }

    handleChange(change) {

        let changedDoc = null;
        let changedIndex = null;

        this.data.forEach((doc, index) => {
            if (doc._id === change.id) {
                changedDoc = doc;
                changedIndex = index;
            }
        });
        //A document was deleted
        if (change.deleted) {
            this.data.splice(changedIndex, 1);
        }
        else {
            //A document was updated
            if (changedDoc) {
                this.data[changedIndex] = change.doc;
            }
            //A document was added
            else {
                this.data.unshift(change.doc);
            }

        }

    }
}
