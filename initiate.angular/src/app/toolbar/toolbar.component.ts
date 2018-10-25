import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Character } from '../models/character';
import { Battle } from '../models/battle';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() battleSelected: EventEmitter<any> = new EventEmitter();
  public savedBattles: Battle[];

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    this.getBattles();
  }

  getBattles() {
    this.savedBattles = this.localStorageService.getSavedBattles();
  }

  selectBattle(battle: Battle) {
    this.battleSelected.emit(battle);
  }

  navigateToConditions() {
    this.router.navigate(['/conditions']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  removeSavedBattles(index: number, event) {
    event.stopPropagation();
    this.savedBattles.splice(index, 1);
    this.localStorageService.setSavedBattles(this.savedBattles);
  }

  battleSaved() {
    this.getBattles();
  }

}
