import { EndCondition } from "./end-condition";

export class CharacterCondition {
    public name: string;
    public durationInRounds: number | null;
    public endCondition: EndCondition | null;
}
