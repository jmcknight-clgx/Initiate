import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() battleSelected: EventEmitter<any> = new EventEmitter();
  public savedBattles: Character[][];

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    this.getBattles();
  }

  getBattles() {
    setTimeout(() => { this.getBattles; }, 500);
    this.savedBattles = this.localStorageService.getSavedBattles();
  }

  getBattleTitle(battle: Character[]) {
    let battleTitle = '';
    battle.forEach(c => battleTitle += c.name + ' ');
    return battleTitle.length > 30 ? battleTitle.substr(0, 30) + '...' : battleTitle;
  }

  selectBattle(battle: Character[]) {
    this.battleSelected.emit(battle);
  }

  navigateToConditions() {
    this.router.navigate(['/conditions']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
