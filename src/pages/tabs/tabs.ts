import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { Diary } from '../diary/diary';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Diary;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
