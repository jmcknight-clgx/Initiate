import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Character } from '../models/character';
import { CharactersComponent } from '../characters/characters.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(CharactersComponent) characters: CharactersComponent;

  constructor() { }

  onBattleSelectedFromToolbar(selectedBattle: Character[]) {
    this.characters.battleSelected(selectedBattle);
  }
}
