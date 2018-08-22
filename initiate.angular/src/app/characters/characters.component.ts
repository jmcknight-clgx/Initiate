import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../models/character';
import { LocalStorageService } from '../services/local-storage.service';
import { CharacterCondition } from '../models/character-condition';
import { CharacterType } from '../enums/character-type.enum';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {
  @Input() combatIsInProgress: boolean;
  @Output() combatEnded = new EventEmitter();

  characters: Character[] = [];
  selectedCharacterRef: Character;
  selectedCharacter: Character;
  newCharacter: Character;
  newCondition: CharacterCondition = new CharacterCondition();
  characterTypeSelector: any;
  characterTypes: any[] = [];
  currentTurnId: string;
  round: number;

  constructor(private localStorageService: LocalStorageService) {
    this.characters = this.localStorageService.getCharacters();
    this.selectCharacter(this.characters[0]);
    this.resetCurrentTurnId();
    this.characterTypeSelector = CharacterType;
    Object.keys(CharacterType).forEach(key => {
      if (+key) this.characterTypes.push({ id: key, value: CharacterType[key], enum: +key as CharacterType });
    });
  }

  ngOnChanges() {
    // Reset initiative order when combat has ended
    if(this.combatIsInProgress) {
      this.resetCurrentTurnId();
      this.round = 1;
    }
  }

  resetCurrentTurnId() {
    let orderedCharacters = this.getOrderedCharacters();
    this.currentTurnId = orderedCharacters.length > 0 ? orderedCharacters[0].id : undefined;
  }

  getOrderedCharacters() {
    if (!this.characters) return [];
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
      this.selectedCharacterRef = character;
      this.selectedCharacter = JSON.parse(JSON.stringify(character));
    }
  }

  saveCharacter() {
    this.selectedCharacterRef.populate(this.selectedCharacter);
    
    if (this.newCharacter) {
      // add character
      this.localStorageService.addCharacter(this.selectedCharacterRef, this.characters);
      this.newCharacter = undefined;
    } else {
      // save character
      this.localStorageService.saveCharacters(this.characters);
    }

    this.clearSelectedCharacter();
    this.resetCurrentTurnId();
  }

  removeCharacter(characterIndex: number, character: Character) {
    let characters = this.getOrderedCharacters();
    characters.splice(characterIndex, 1);
    this.characters = characters;
    this.localStorageService.saveCharacters(characters);

    if (this.selectedCharacter && character.id === this.selectedCharacter.id) {
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
    this.combatEnded.emit();
  }

  clearSelectedCharacter() {
    this.selectedCharacterRef = undefined;
    this.selectedCharacter = undefined;
  }

  next() {
    let current = this.characters.filter(c => c.id == this.currentTurnId)[0];
    let currentIndex = this.getOrderedCharacters().indexOf(current);
    
    // are we at the end of character list
    if(currentIndex == this.characters.length - 1) {
      // start back at the top
      this.resetCurrentTurnId();
      this.round++;
    } else {
      // continue to next character in list
      this.currentTurnId = this.getOrderedCharacters()[currentIndex + 1].id;
    }
  }

}
