import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'app';
  combatIsInProgress: Boolean = false;
  combatButtonText: string = "Start";

  constructor() {}

  toggleCombat() {
    this.combatIsInProgress = !this.combatIsInProgress;
    this.combatButtonText = this.combatIsInProgress ? "End" : "Start"; 
  }

  navigateToConditions() {
    //this.router.navigate(['/conditions']);
  }
}
