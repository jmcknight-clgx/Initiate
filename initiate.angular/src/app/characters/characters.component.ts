import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {

  characters: Character[] = [];
  selectedCharacter: Character;

  constructor() {
    this.characters = [{
      name: 'TEST',
      initiative: 15
    } as Character,
    {
      name: 'TEST2',
      initiative: 17
    } as Character];

    this.selectedCharacter = this.characters[0];
  }

}
