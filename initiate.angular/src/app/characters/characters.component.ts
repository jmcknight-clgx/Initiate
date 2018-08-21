import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {

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
