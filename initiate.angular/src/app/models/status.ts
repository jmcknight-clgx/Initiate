import { EndCondition } from "./end-condition";

export class Status {
    public name: string;
    public description: string;
    public durationInRounds: number | null;
    public endCondition: EndCondition | null;
}
