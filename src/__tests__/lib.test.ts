import { toUpperCase, pairSplit } from "../lib";

export interface IToUpperCaseTestData {
    raw: string,
    result: string,
}

export interface IPairSplitTestData {
    raw: string,
    result: string[],
}

describe("Lib methods", () => {
    describe("To uppercase", () => {
        const data: IToUpperCaseTestData[] = [
            {
                raw: "7E02000026123456789012007D02000000010000000200BA7F0E07E4F11C0028003C00001810151010100104000000640202007D01137E",
                result: "7E02000026123456789012007D02000000010000000200BA7F0E07E4F11C0028003C00001810151010100104000000640202007D01137E"
            }
        ];

        data.map((d: IToUpperCaseTestData, i: number) => {
            test(`To uppercase example [${i}]`, () => {
                const result = toUpperCase(d.raw);
                expect(result).toBe(d.result);
            });
        })
    });

    describe("Pair split", () => {
        const data: IPairSplitTestData[] = [
            {
                raw: "7E02000026123456789012007D02000000010000000200BA7F0E07E4F11C0028003C00001810151010100104000000640202007D01137E",
                result: ["7E", "02", "00", "00", "26", "12", "34", "56", "78", "90", "12", "00", "7D", "02", "00", "00", "00", "01", "00", "00", "00", "02", "00", "BA", "7F", "0E", "07", "E4", "F1", "1C", "00", "28", "00", "3C", "00", "00", "18", "10", "15", "10", "10", "10", "01", "04", "00", "00", "00", "64", "02", "02", "00", "7D", "01", "13", "7E"]
            }
        ];

        data.map((d: IPairSplitTestData, i: number) => {
            test(`Pair split example [${i}]`, () => {
                const result = pairSplit(d.raw);
                expect(result).toStrictEqual(d.result);
            });
        });
    });
});