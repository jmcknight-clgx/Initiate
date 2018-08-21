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
  tempCharacter: Character;
  newCharacter: Character;

  constructor(private localStorageService: LocalStorageService) {
    this.characters = this.localStorageService.getCharacters();
    this.selectCharacter(this.characters[0]);
  }

  getOrderedCharacters() {
    let sortedList = this.characters.slice(0);
    sortedList.sort((left, right): number => right.initiative - left.initiative);

    return sortedList;
  }

  displayNewCharacterForm() {
    this.newCharacter = new Character();
    this.selectCharacter(this.newCharacter);
  }

  selectCharacter(character: Character) {
    if (character) {
      this.selectedCharacter = character;
      this.tempCharacter = JSON.parse(JSON.stringify(character));//Object.assign(new Character(), character);
    }
  }

  saveCharacter() {
    this.selectedCharacter.populate(this.tempCharacter);
    if (this.newCharacter) {
      // add character
      this.localStorageService.addCharacter(this.newCharacter, this.characters);
      this.newCharacter = undefined;
    } else {
      // save character
      this.localStorageService.saveCharacters(this.characters);
    }

    this.clearSelectedCharacter();
  }

  resetForm() {
    this.characters = [];
    this.clearSelectedCharacter();
    this.localStorageService.saveCharacters([] as Character[]);
  }

  clearSelectedCharacter() {
    this.selectedCharacter = undefined;
    this.tempCharacter = undefined;
  }

}
