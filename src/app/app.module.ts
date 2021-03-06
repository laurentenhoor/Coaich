import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { TouchID } from '@ionic-native/touch-id';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Goals } from '../pages/goals/goals';
import { Coach } from '../pages/coach/coach';
import { Diary } from '../pages/diary/diary';
import { Login } from '../pages/login/login';

import { NoteEdit } from '../pages/note-edit/note-edit';
import { TabsPage } from '../pages/tabs/tabs';

import { Notes } from '../providers/notes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../pages/login/login.service';
import { ToneViewer } from '../components/tone-viewer/tone-viewer';

@NgModule({
  declarations: [
    MyApp,
    Goals,
    Coach,
    Diary,
    Login,
    TabsPage,
    NoteEdit,
    ToneViewer,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Goals,
    Coach,
    Diary,
    Login,
    TabsPage,
    NoteEdit,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FingerprintAIO,
    TouchID,
    Notes,
    LoginService,
    HttpClient,
  ]
})
export class AppModule {}
