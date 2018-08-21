import { Injectable } from '@angular/core';
import { Character } from '../models/character';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    addCharacter(newCharacter: Character, characters: Character[]) {
        characters.push(newCharacter);
        this.saveCharacters(characters);
    }

    saveCharacters(characters: Character[]) {
        window.localStorage.setItem('characters', JSON.stringify(characters));
    }

    getCharacters() {
        let charactersItem = window.localStorage.getItem('characters');
        if (charactersItem) {
            return JSON.parse(charactersItem);
        }

        return [];
    }

}