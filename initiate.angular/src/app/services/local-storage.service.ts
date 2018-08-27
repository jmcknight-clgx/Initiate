import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { CharacterCondition } from '../models/character-condition';

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
            let characters = JSON.parse(charactersItem) as Character[];
            return characters.map(c => Object.assign(new Character(), c));
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

}