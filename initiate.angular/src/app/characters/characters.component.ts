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
  newCondition: string;
  conditionRoundDuration: number;
  selectedCondition: string;
  characterConditions: string[];
  characterTypeSelector: any;
  characterTypes: any[] = [];
  currentTurnId: string;
  round: number;
  hpDelta: number;

  constructor(private localStorageService: LocalStorageService) {
    this.characters = this.localStorageService.getCharacters();
    this.refreshCharacterConditions();
    this.resetCurrentTurnId();
    this.characterTypeSelector = CharacterType;
    Object.keys(CharacterType).forEach(key => {
      if (+key) this.characterTypes.push({ id: key, value: CharacterType[key], enum: +key as CharacterType });
    });
  }

  ngOnChanges() {
    // Reset initiative order when combat has ended
    if (this.combatIsInProgress) {
      this.resetCurrentTurnId();
      this.round = 1;
    }
  }

  refreshCharacterConditions() {
    this.characterConditions = this.localStorageService.getConditions();
    this.characterConditions.push('Other');
  }

  resetCurrentTurnId() {
    if (this.characters.length > 0) {
      this.currentTurnId = this.getOrderedCharacters()[0].id;
      this.selectCharacter(this.characters.find(c => c.id === this.currentTurnId));
    }
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
      this.selectedCharacter = Object.assign(new Character(), character);
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

    let condition = new CharacterCondition();
    condition.durationInRounds = this.conditionRoundDuration;

    if (this.newCondition) {
      condition.name = this.newCondition;
      this.selectedCharacter.conditions.push(condition);
      this.localStorageService.addCondition(condition.name);
      this.newCondition = undefined;
      this.refreshCharacterConditions();
    } else if (this.selectedCondition) {
      if (this.selectedCondition != 'Other') {
        condition.name = this.selectedCondition;
        this.selectedCharacter.conditions.push(condition);
      }
    }
  }

  removeCharacterCondition(conditionIndex: number) {
    this.selectedCharacter.conditions.splice(conditionIndex, 1);
  }

  resetForm() {
    this.characters = this.characters.filter(c => c.characterType != CharacterType.Monster);
    this.clearSelectedCharacter();
    this.localStorageService.saveCharacters(this.characters);
    if (this.combatIsInProgress) this.combatEnded.emit();
  }

  clearSelectedCharacter() {
    this.selectedCharacterRef = undefined;
    this.selectedCharacter = undefined;
  }

  next() {
    let current = this.characters.filter(c => c.id == this.currentTurnId)[0];
    let currentIndex = this.getOrderedCharacters().indexOf(current);

    // are we at the end of character list
    if (currentIndex == this.characters.length - 1) {
      // start back at the top
      this.incrementRound();
    } else {
      // continue to next character in list
      let nextCharacter = this.getOrderedCharacters()[currentIndex + 1];
      this.currentTurnId = nextCharacter.id;
      this.selectCharacter(nextCharacter);
    }
  }

  incrementRound() {
    this.round++;

    // clean up character conditions
    this.characters.forEach(c => {

      // remove conditions that have ended based on round count
      c.conditions = c.conditions.filter(x => x.durationInRounds != 1);

      // reduce rounds left in condition
      c.conditions.forEach(x => {
        if (x.durationInRounds) {
          x.durationInRounds--;
        }
      })
    });

    this.resetCurrentTurnId();

    // save characters
    this.localStorageService.saveCharacters(this.characters);
  }

  setInitialHp() {
    if (!this.selectedCharacter.currentHp) this.selectedCharacter.currentHp = this.selectedCharacter.maxHp;
  }

  modifyHp(isAddition: boolean) {
    if (!isAddition) this.hpDelta *= -1;
    this.selectedCharacter.currentHp += this.hpDelta;
    if (this.selectedCharacter.currentHp > this.selectedCharacter.maxHp) this.selectedCharacter.currentHp = this.selectedCharacter.maxHp;
    this.hpDelta = undefined;
  }

}
