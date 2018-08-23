import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CombatService {

    private combatIsInProgress: boolean = false;

    isCombatInProgress() {
        return this.combatIsInProgress;
    }

    toggleCombat() {
        this.combatIsInProgress = !this.combatIsInProgress;
      }
}