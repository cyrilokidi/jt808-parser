import { toUpperCase, pairSplit, restoreEscape } from "../lib";

export interface IToUpperCaseTestData {
    raw: string,
    result: string,
}

export interface IPairSplitTestData {
    raw: string,
    result: string[],
}

export interface IRestoreEscapeTestData {
    raw: string[],
    result: string,
}

describe("Lib methods", () => {
    describe("To uppercase", () => {
        const data: IToUpperCaseTestData[] = [
            {
                raw: "7e02000026123456789012007d02000000010000000200ba7f0e07e4f11c0028003c00001810151010100104000000640202007d01137e",
                result: "7E02000026123456789012007D02000000010000000200BA7F0E07E4F11C0028003C00001810151010100104000000640202007D01137E"
            },
            {
                raw: "7e0200004104404920038717bb00000000000000070013973c02321a9000000000000222120113014001040004183d020266480302000030011d310109d30200ef4901004a0203202b0466486323607e",
                result: "7E0200004104404920038717BB00000000000000070013973C02321A9000000000000222120113014001040004183D020266480302000030011D310109D30200EF4901004A0203202B0466486323607E"
            },
            {
                raw: "7e0102000e04404916537400023833303434303439313635333700037e",
                result: "7E0102000E04404916537400023833303434303439313635333700037E"
            },
            {
                raw: "7e0100002d0440491653740001002c012c37303931314a585f41313233343536000000000000000000003931363533373402b6f5413838383838267e",
                result: "7E0100002D0440491653740001002C012C37303931314A585F41313233343536000000000000000000003931363533373402B6F5413838383838267E"
            }
        ];

        data.map((d: IToUpperCaseTestData, i: number) => {
            test(`To uppercase example [${i}]`, () => {
                const result = toUpperCase(d.raw);
                expect(result).toEqual(d.result);
            });
        })
    });

    describe("Pair split", () => {
        const data: IPairSplitTestData[] = [
            {
                raw: "7E02000026123456789012007D02000000010000000200BA7F0E07E4F11C0028003C00001810151010100104000000640202007D01137E",
                result: ["7E", "02", "00", "00", "26", "12", "34", "56", "78", "90", "12", "00", "7D", "02", "00", "00", "00", "01", "00", "00", "00", "02", "00", "BA", "7F", "0E", "07", "E4", "F1", "1C", "00", "28", "00", "3C", "00", "00", "18", "10", "15", "10", "10", "10", "01", "04", "00", "00", "00", "64", "02", "02", "00", "7D", "01", "13", "7E"]
            },
            {
                raw: "7E0200004104404920038717BB00000000000000070013973C02321A9000000000000222120113014001040004183D020266480302000030011D310109D30200EF4901004A0203202B0466486323607E",
                result: ["7E", "02", "00", "00", "41", "04", "40", "49", "20", "03", "87", "17", "BB", "00", "00", "00", "00", "00", "00", "00", "07", "00", "13", "97", "3C", "02", "32", "1A", "90", "00", "00", "00", "00", "00", "02", "22", "12", "01", "13", "01", "40", "01", "04", "00", "04", "18", "3D", "02", "02", "66", "48", "03", "02", "00", "00", "30", "01", "1D", "31", "01", "09", "D3", "02", "00", "EF", "49", "01", "00", "4A", "02", "03", "20", "2B", "04", "66", "48", "63", "23", "60", "7E"]
            },
            {
                raw: "7E0102000E04404916537400023833303434303439313635333700037E",
                result: ["7E", "01", "02", "00", "0E", "04", "40", "49", "16", "53", "74", "00", "02", "38", "33", "30", "34", "34", "30", "34", "39", "31", "36", "35", "33", "37", "00", "03", "7E"]
            },
            {
                raw: "7E0100002D0440491653740001002C012C37303931314A585F41313233343536000000000000000000003931363533373402B6F5413838383838267E",
                result: ["7E", "01", "00", "00", "2D", "04", "40", "49", "16", "53", "74", "00", "01", "00", "2C", "01", "2C", "37", "30", "39", "31", "31", "4A", "58", "5F", "41", "31", "32", "33", "34", "35", "36", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "39", "31", "36", "35", "33", "37", "34", "02", "B6", "F5", "41", "38", "38", "38", "38", "38", "26", "7E"]
            }
        ];

        data.map((d: IPairSplitTestData, i: number) => {
            test(`Pair split example [${i}]`, () => {
                const result = pairSplit(d.raw);
                expect(result).toStrictEqual(d.result);
            });
        });
    });

    describe("Restore escape", () => {
        const data: IRestoreEscapeTestData[] = [
            {
                raw: ["7E", "02", "00", "00", "26", "12", "34", "56", "78", "90", "12", "00", "7D", "02", "00", "00", "00", "01", "00", "00", "00", "02", "00", "BA", "7F", "0E", "07", "E4", "F1", "1C", "00", "28", "00", "3C", "00", "00", "18", "10", "15", "10", "10", "10", "01", "04", "00", "00", "00", "64", "02", "02", "00", "7D", "01", "13", "7E"],
                result: "7E02000026123456789012007E000000010000000200BA7F0E07E4F11C0028003C00001810151010100104000000640202007D137E"
            },
            {
                raw: ["7E", "02", "00", "00", "41", "04", "40", "49", "20", "03", "87", "17", "BB", "00", "00", "00", "00", "00", "00", "00", "07", "00", "13", "97", "3C", "02", "32", "1A", "90", "00", "00", "00", "00", "00", "02", "22", "12", "01", "13", "01", "40", "01", "04", "00", "04", "18", "3D", "02", "02", "66", "48", "03", "02", "00", "00", "30", "01", "1D", "31", "01", "09", "D3", "02", "00", "EF", "49", "01", "00", "4A", "02", "03", "20", "2B", "04", "66", "48", "63", "23", "60", "7E"],
                result: "7E0200004104404920038717BB00000000000000070013973C02321A9000000000000222120113014001040004183D020266480302000030011D310109D30200EF4901004A0203202B0466486323607E"
            },
            {
                raw: ["7E", "01", "02", "00", "0E", "04", "40", "49", "16", "53", "74", "00", "02", "38", "33", "30", "34", "34", "30", "34", "39", "31", "36", "35", "33", "37", "00", "03", "7E"],
                result: "7E0102000E04404916537400023833303434303439313635333700037E"
            },
            {
                raw: ["7E", "01", "00", "00", "2D", "04", "40", "49", "16", "53", "74", "00", "01", "00", "2C", "01", "2C", "37", "30", "39", "31", "31", "4A", "58", "5F", "41", "31", "32", "33", "34", "35", "36", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "39", "31", "36", "35", "33", "37", "34", "02", "B6", "F5", "41", "38", "38", "38", "38", "38", "26", "7E"],
                result: "7E0100002D0440491653740001002C012C37303931314A585F41313233343536000000000000000000003931363533373402B6F5413838383838267E"
            }
        ];

        data.map((d: IRestoreEscapeTestData, i: number) => {
            test(`Restore escape example [${i}]`, () => {
                const result = restoreEscape(d.raw);
                expect(result).toEqual(d.result);
            });
        });
    });
});