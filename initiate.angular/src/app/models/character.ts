import { Condition } from "./character-condition";

export class Character {
    public name: string;
    public initiative: number;
    public ac: number;
    public hp: number;
    public conditions: Condition[] = [];
    public isSelected: boolean;

    populate(character: Character) {
        this.name = character.name;
        this.initiative = character.initiative;
        this.ac = character.ac;
        this.hp = character.hp;
        this.conditions = character.conditions;
        this.isSelected = false;
    }
}
