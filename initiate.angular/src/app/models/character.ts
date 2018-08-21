import { CharacterCondition } from "./character-condition";
import { CharacterType } from "../enums/character-type.enum";

export class Character {
    public name: string;
    public initiative: number;
    public ac: number;
    public hp: number;
    public conditions: CharacterCondition[] = [];
    public isSelected: boolean;
    public characterType: CharacterType = CharacterType.Undefined;

    populate(character: Character) {
        this.name = character.name;
        this.initiative = character.initiative;
        this.ac = character.ac;
        this.hp = character.hp;
        this.characterType = character.characterType;
        this.conditions = character.conditions;
        this.isSelected = false;
    }
}
