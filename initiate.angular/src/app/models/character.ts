import { CharacterCondition } from "./character-condition";
import { CharacterType } from "../enums/character-type.enum";
import { Guid } from "./guid";
import { Stats } from "./stats";
import { SerializeHelper } from "./serialize-helper";

export class Character extends SerializeHelper {

    constructor() {
        super();
        this.id = Guid.newGuid();
        this.d20Roll = Math.floor(Math.random() * 20) + 1;
        this.characterType == CharacterType.PC;
        this.stats = new Stats();
    }

    // constructor(id: string, name: string, initiative: number, ac: number, currentHp: number, maxHp:number, conditions: CharacterCondition[]) {
    //     this.id = Guid.newGuid();
    //     this.d20Roll = Math.floor(Math.random() * 20) + 1;
    //     this.characterType == CharacterType.PC;
    //     this.stats = new Stats();
    // }

    public id: string;
    public name: string;
    public initiative: number;
    public ac: number;
    public currentHp: number;
    public maxHp: number;
    public conditions: CharacterCondition[] = [];
    public characterType: CharacterType;
    public d20Roll: number;
    public stats: Stats;

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
        if (this.characterType == CharacterType.Monster) return 'pets';
        return 'face';
    }

    getInit() {
        if (this.characterType == CharacterType.PC)
            return this.initiative;
        else
            return this.d20Roll + this.initiative;
    }
}
