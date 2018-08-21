import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  characters: any[] = [];
  selectedCharacter: any;

  constructor() {
    this.characters = [{
      name: 'TEST',
      initiative: 15
    },
    {
      name: 'TEST2',
      initiative: 17
    }];

    this.selectedCharacter = this.characters[0];
  }
}
