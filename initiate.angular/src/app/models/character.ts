import { CharacterCondition } from "./character-condition";
import { CharacterType } from "../enums/character-type.enum";
import { Guid } from "./guid";

export class Character {

    constructor() {
        this.id = Guid.newGuid();
    }

    public id: string;
    public name: string;
    public initiative: number;
    public ac: number;
    public currentHp: number;
    public maxHp: number;
    public conditions: CharacterCondition[] = [];
    public characterType: CharacterType;

    populate(character: Character) {
        this.id = character.id;
        this.name = character.name;
        this.initiative = character.initiative;
        this.ac = character.ac;
        this.currentHp = character.currentHp;
        this.maxHp = character.maxHp;
        this.characterType = character.characterType;
        this.conditions = character.conditions;
    }

    getCharacterTypeIcon() {
        if(this.characterType == CharacterType.Monster) return 'pets';
        return 'face';
    }
}
