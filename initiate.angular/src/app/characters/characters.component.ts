import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {

  characters: Character[] = [];
  selectedCharacter: Character;
  newCharacter: Character;

  constructor(private localStorageService: LocalStorageService) {
    this.characters = this.localStorageService.getCharacters();
    this.selectedCharacter = this.characters[0];
  }

  getOrderedCharacters() {
    let sortedList = this.characters.slice(0);
    sortedList.sort((left, right): number => {
      if (left.initiative < right.initiative) return 1;
      if (left.initiative > right.initiative) return -1;
      return 0;
    });

    return sortedList;
  }

  displayNewCharacterForm() {
    this.newCharacter = new Character();
    this.selectedCharacter = this.newCharacter;
  }

  saveCharacter() {
    if (this.newCharacter) {
      // add character
      this.localStorageService.addCharacter(this.newCharacter, this.characters);
      this.newCharacter = undefined;
      return;
    }

    // save character
    this.localStorageService.saveCharacters(this.characters);
  }

}
