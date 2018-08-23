import { Component, OnInit } from '@angular/core';
import { CharacterCondition } from '../models/character-condition';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit {
  characterConditions: string[];
  constructor(private localStorageService: LocalStorageService) { 
    this.characterConditions = this.localStorageService.getConditions();
  }

  ngOnInit() {
  }

}
