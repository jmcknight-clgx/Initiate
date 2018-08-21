import { Status } from "./status";

export class Character {
    public name: string;
    public initiative: number;
    public ac: number;
    public statuses: Status[];
}
