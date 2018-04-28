import { Component } from '@angular/core';

import { Goals } from '../goals/goals';
import { Coach } from '../coach/coach';
import { Diary } from '../diary/diary';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Diary;
  tab2Root = Goals;
  tab3Root = Coach;

  constructor() {

  }
}
