import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Diary } from '../pages/diary/diary';
import { Login } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = Diary;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (!platform.is('cordova')) {
        this.rootPage = Diary;
      }

    });
  }
}
