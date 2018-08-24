import { Component, OnInit } from '@angular/core';
import { CharacterCondition } from '../models/character-condition';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent {
  characterConditions: string[];
  newCondition: string;

  constructor(private localStorageService: LocalStorageService) {
    this.characterConditions = this.localStorageService.getConditions();
  }

  removeCondition(index: number) {
    this.characterConditions.splice(index, 1);
    this.localStorageService.saveConditions(this.characterConditions);
  }

  addCharacterCondition() {
    if (this.newCondition) {
      this.characterConditions.push(this.newCondition);
      this.localStorageService.saveConditions(this.characterConditions);
      this.newCondition = undefined;
    }
  }

}
