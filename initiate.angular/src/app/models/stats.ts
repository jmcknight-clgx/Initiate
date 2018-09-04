import { SerializeHelper } from "./serialize-helper";

export class Stats extends SerializeHelper{
    public Strength: number;
    public Dexterity: number;
    public Constitution: number;
    public Intelligence: number;
    public Wisdom: number;
    public Charisma: number

    
    public get StrengthMod() : number {
        return this.calculateMod(this.Strength);
    }
    public get DexterityMod() : number {
        return this.calculateMod(this.Dexterity);
    }
    public get ConstitutionMod() : number {
        return this.calculateMod(this.Constitution);
    }
    public get IntelligenceMod() : number {
        return this.calculateMod(this.Intelligence);
    }
    public get WisdomMod() : number {
        return this.calculateMod(this.Wisdom);
    }
    public get CharismaMod() : number {
        return this.calculateMod(this.Charisma);
    }

    private calculateMod(input: number) : number {
        if(!input) return 0;
        return Math.floor(input / 2) - 5;
    }

    
}