import { Stats } from "./stats";

describe('stats', () => { 
    describe("CalculateMod", () => {
        it("should return 0 when stat is 11", () => {
            let target = new Stats();
            target.Strength = 11;

            expect(target.StrengthMod).toBe(0);
        });

        it("should return -1 when stat is 9", () => {
            let target = new Stats();
            target.Dexterity = 9;

            expect(target.DexterityMod).toBe(-1);
        });

        it("should return 2 when stat is 15", () => {
            let target = new Stats();
            target.Charisma = 15;

            expect(target.CharismaMod).toBe(2);
        });

        it("should return 3 when stat is 16", () => {
            let target = new Stats();
            target.Constitution = 16;

            expect(target.ConstitutionMod).toBe(3);
        });
        it("should return 0 when stat is undefined", () => {
            let target = new Stats();
            target.Constitution = undefined;

            expect(target.ConstitutionMod).toBe(0);
        });
    });
});