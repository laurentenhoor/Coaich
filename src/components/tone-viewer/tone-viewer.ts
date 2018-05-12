import { Component, Input } from '@angular/core';

@Component({
  selector: 'tone-viewer',
  templateUrl: 'tone-viewer.html'
})
export class ToneViewer {

  @Input('tone') tone;

  private emojiMapping = {
    'analytical': '😐',
    'confident': '💪',
    'tentative': '🤷‍',
    'sadness': '😢',
    'anger': '😡',
    'fear': '😧',
    'joy': '😃'
  }

  private bannedTones = [
    // 'analytical', 'confident', 'tentative'
  ]

  constructor() {
  }

  ngOnInit() {
  }

}