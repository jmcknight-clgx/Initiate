import { Status } from "./status";

export class Character {
    public name: string;
    public initiative: number;
    public ac: number;
    public statuses: Status[];

    populate(character: Character) {
        this.name = character.name;
        this.initiative = character.initiative;
        this.ac = character.ac;
        this.statuses = character.statuses;
    }
}
