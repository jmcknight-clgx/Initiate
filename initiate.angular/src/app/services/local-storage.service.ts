import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { CharacterCondition } from '../models/character-condition';
import { Stats } from '../models/stats';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    addCharacter(newCharacter: Character, characters: Character[]) {
        let existingCharacter = characters.find(c => c.id == newCharacter.id);
        if(!existingCharacter) characters.push(newCharacter);
        this.saveCharacters(characters);
    }

    saveCharacters(characters: Character[]) {
        window.localStorage.setItem('characters', JSON.stringify(characters));
    }

    getCharacters(): Character[] {
        let charactersItem = window.localStorage.getItem('characters');
        if (charactersItem) {
            let charactersJsonObj = JSON.parse(charactersItem) as Character[];
            return charactersJsonObj.map(c => {
                let char = new Character();
                char.fillFromJSONObj(c)
                char.stats = new Stats();
                char.stats.fillFromJSONObj(c.stats)
                return char;
            });
        }

        return [] as Character[];
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

    saveForm(characters: Character[]) {
        let battles = this.getSavedBattles();
        battles.push(characters);
        window.localStorage.setItem('savedBattles', JSON.stringify(battles));
    }

    getSavedBattles() : Character[][] {
        let battlesJson = window.localStorage.getItem('savedBattles');
        if(!battlesJson) return [];
        let battles = JSON.parse(battlesJson) as Character[][];
        return battles.map(battle => {
            return battle.map(c => Object.assign(new Character(), c));
        });
    }

    setSavedBattles(battles: Character[][]) {
        window.localStorage.setItem('savedBattles', JSON.stringify(battles));
    }

}