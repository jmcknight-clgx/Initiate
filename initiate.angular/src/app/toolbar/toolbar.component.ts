import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CombatService } from '../services/combat.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private router: Router, private combatService: CombatService) {
  }

  toggleCombat() {
    this.combatService.toggleCombat();
  }

  getCombatButtonText() {
    return this.combatService.isCombatInProgress() ? "End" : "Start";
  }

  navigateToConditions() {
    this.router.navigate(['/conditions']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  showToolbarButtons() {
    if (this.router.url.indexOf("conditions") >= 0) return false;
    return true; 
  }

}
