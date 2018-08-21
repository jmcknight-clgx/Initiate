import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../models/character';
import { LocalStorageService } from '../services/local-storage.service';
import { CharacterCondition } from '../models/character-condition';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {
  @Input() combatIsInProgress: boolean; 

  characters: Character[] = [];
  selectedCharacterRef: Character;
  selectedCharacter: Character;
  newCharacter: Character;
  newCondition: CharacterCondition = new CharacterCondition();

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
      this.characters.forEach(c => c.isSelected = false);
      character.isSelected = true;

      this.selectedCharacterRef = character;
      this.selectedCharacter = JSON.parse(JSON.stringify(character));
    }
  }

  saveCharacter() {
    this.selectedCharacterRef.populate(this.selectedCharacter);

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

  removeCharacter(characterIndex: number, character: Character) {
    let characters = this.getOrderedCharacters();
    characters.splice(characterIndex, 1);
    this.characters = characters;
    this.localStorageService.saveCharacters(characters);

    if (character.isSelected) {
      this.clearSelectedCharacter();
    }
  }

  addCharacterCondition() {
    if (this.newCondition) {
      this.selectedCharacter.conditions.push(this.newCondition);
      this.newCondition = new CharacterCondition();
    }
  }

  removeCharacterCondition(conditionIndex: number) {
    this.selectedCharacter.conditions.splice(conditionIndex, 1);
  }

  resetForm() {
    this.characters = [];
    this.clearSelectedCharacter();
    this.localStorageService.saveCharacters([] as Character[]);
  }

  clearSelectedCharacter() {
    this.characters.forEach(c => c.isSelected = false);
    this.selectedCharacterRef = undefined;
    this.selectedCharacter = undefined;
  }

}
