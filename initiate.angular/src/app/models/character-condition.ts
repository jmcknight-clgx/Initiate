import { EndCondition } from "./end-condition";

export class Condition {
    public name: string;
    public description: string;
    public durationInRounds: number | null;
    public endCondition: EndCondition | null;
}
