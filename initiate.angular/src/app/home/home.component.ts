import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Character } from '../models/character';
import { CharactersComponent } from '../characters/characters.component';
import { MatTabNavBase } from '@angular/material/tabs/typings/tab-nav-bar';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Battle } from '../models/battle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(CharactersComponent) characters: CharactersComponent;
  @ViewChild(ToolbarComponent) toolbar: ToolbarComponent;

  constructor() { }

  onBattleSelectedFromToolbar(selectedBattle: Battle) {
    this.characters.battleSelected(selectedBattle);
  }

  onBattleSaved() {
    this.toolbar.battleSaved();
  }
}
