import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { CharacterCondition } from '../models/character-condition';
import { Stats } from '../models/stats';
import { Battle } from '../models/battle';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    addCharacter(newCharacter: Character, battle: Battle) {
        let existingCharacter = battle.characters.find(c => c.id == newCharacter.id);
        if(!existingCharacter) battle.characters.push(newCharacter);
        this.saveCharacters(battle);
    }

    saveCharacters(battle: Battle) {
        window.localStorage.setItem('battle', JSON.stringify(battle));
    }

    getCharacters(): Battle {
        let battleJson = window.localStorage.getItem('battle');
        if (battleJson) {
            let battle = JSON.parse(battleJson) as Battle;
            battle.characters = battle.characters.map(c => {
                        let char = new Character();
                        char.fillFromObj(c)
                        char.stats = new Stats();
                        char.stats.fillFromObj(c.stats)
                        return char;
                    });
            return battle
        }
        let battle = new Battle();
        battle.characters = [];

        return battle;
    }

    addCondition(conditionName: string) {
        let conditions = this.getConditions();
        conditions.push(conditionName);
        window.localStorage.setItem('conditions', JSON.stringify(conditions));
    }

    getConditions(): string[] {
        let conditions = window.localStorage.getItem('conditions');
        if (!conditions) return [];
        return JSON.parse(conditions) as string[];
    }

    saveConditions(conditions: string[]) {
        window.localStorage.setItem('conditions', JSON.stringify(conditions));
    }

    saveForm(battle: Battle) {
        let battles = this.getSavedBattles();
        battles = battles.filter(x => x.name != battle.name);
        battles.push(battle);
        window.localStorage.setItem('savedBattles', JSON.stringify(battles));
    }

    getSavedBattles() : Battle[] {
        let battlesJson = window.localStorage.getItem('savedBattles');
        if(!battlesJson) return [];
        let battles = JSON.parse(battlesJson) as Battle[];
        return battles.map(battle => {
            return {
                name: battle.name,
                characters: battle.characters.map(c => {
                    let char = new Character();
                    char.fillFromObj(c)
                    char.stats = new Stats();
                    char.stats.fillFromObj(c.stats)
                    return char;
                }),
            } as Battle
        });
    
    }

    setSavedBattles(battles: Battle[]) {
        window.localStorage.setItem('savedBattles', JSON.stringify(battles));
    }

}