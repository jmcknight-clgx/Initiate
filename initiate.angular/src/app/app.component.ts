import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'app';
  combatIsInProgress: Boolean = false;
  combatButtonText: string = "Start";

  toggleCombat() {
    this.combatIsInProgress = !this.combatIsInProgress;
    this.combatButtonText = this.combatIsInProgress ? "End" : "Start"; 
  }
}
