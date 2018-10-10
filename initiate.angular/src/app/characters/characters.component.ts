import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Character } from '../models/character';
import { LocalStorageService } from '../services/local-storage.service';
import { CharacterCondition } from '../models/character-condition';
import { CharacterType } from '../enums/character-type.enum';
import { Guid } from '../models/guid';
import { EndCondition } from '../models/end-condition';
import { Ability } from '../enums/ability.enum';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  @Output() battleSaved: EventEmitter<any> = new EventEmitter();
  innerWidth: any;
  opened: boolean = true;
  characters: Character[] = [];
  selectedCharacterRef: Character;
  selectedCharacter: Character;
  newCharacter: Character;
  newCondition: string;
  conditionRoundDuration: number;
  conditionEndCondition: EndCondition = new EndCondition();
  endConditionAbilities: any[] = [];
  selectedCondition: string;
  characterConditions: string[];
  characterTypeSelector: any;
  characterTypes: any[] = [];
  currentTurnId: string;
  round: number;
  hpDelta: number;
  abilitySelector: any;
  combatIsInProgress: boolean;

  constructor(private localStorageService: LocalStorageService) {
    this.characters = this.localStorageService.getCharacters();
    this.refreshCharacterConditions();
    this.resetCurrentTurnId();
    this.characterTypeSelector = CharacterType;
    this.abilitySelector = Ability;
    Object.keys(CharacterType).forEach(key => {
      if (+key) this.characterTypes.push({ id: key, value: CharacterType[key], enum: +key as CharacterType });
    });
    Object.keys(Ability).forEach(key => {
      if (+key) this.endConditionAbilities.push({ id: key, value: Ability[key], enum: +key as Ability });
    });
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  battleSelected(battle: Character[]) {
    this.resetForm();
    this.characters = battle;
  }

  isSidebarOpened() {
    return this.innerWidth >= 992;
  }

  toggleCombat() {
    this.combatIsInProgress = !this.combatIsInProgress;
    if (this.combatIsInProgress) {
      this.resetCurrentTurnId();
      this.round = 1;
    }
  }

  getCombatButtonText() {
    return this.combatIsInProgress ? "End" : "Start";
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
    sortedList.sort((left, right): number => right.getInit() - left.getInit());
    return sortedList;
  }

  displayNewCharacterForm() {
    this.newCharacter = new Character();
    this.selectCharacter(this.newCharacter);
    this.localStorageService.addCharacter(this.selectedCharacterRef, this.characters);
  }

  selectCharacter(character: Character) {
    if (character) {
      this.selectedCharacterRef = character;
      this.selectedCharacter = character;
      this.localStorageService.saveCharacters(this.characters);
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
  }

  removeCharacter(characterIndex: number, character: Character) {
    let characters = this.getOrderedCharacters();
    characters.splice(characterIndex, 1);
    this.characters = characters;
    this.localStorageService.saveCharacters(characters);

    if (this.selectedCharacter && character.id === this.selectedCharacter.id) {
      this.clearSelectedCharacter();
    }

    // select next character
    if (this.currentTurnId == character.id) {
      let nextCharacter = characterIndex == this.characters.length ? this.characters[0] : this.characters[characterIndex];
      if (nextCharacter) {
        this.currentTurnId = nextCharacter.id;
        this.selectCharacter(this.characters.find(c => c.id == this.currentTurnId));
      }
    }
  }

  addCharacterCondition() {
    let condition = new CharacterCondition();
    condition.durationInRounds = this.conditionRoundDuration;
    condition.endCondition = this.conditionEndCondition;

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

    this.saveCharacter();
  }

  removeCharacterCondition(conditionIndex: number) {
    this.selectedCharacter.conditions.splice(conditionIndex, 1);
  }

  resetForm() {
    this.characters = this.characters.filter(c => c.characterType != CharacterType.Monster);
    this.clearSelectedCharacter();
    this.localStorageService.saveCharacters(this.characters);
    if (this.combatIsInProgress) this.toggleCombat();
  }

  saveForm() {
    this.localStorageService.saveForm(this.characters);
    this.battleSaved.emit();
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

    this.localStorageService.saveCharacters(this.characters);
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

  clone() {
    if (this.selectCharacter) {
      let temp = Object.assign(new Character(), this.selectedCharacter);;
      temp.conditions = Object.assign([], this.selectedCharacter.conditions)
      temp.id = Guid.newGuid();
      temp.d20Roll = Math.floor(Math.random() * 20) + 1;
      this.characters.push(temp);
      this.selectCharacter(temp);
    }
  }

}
