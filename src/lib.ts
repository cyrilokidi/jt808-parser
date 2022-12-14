import { EEscapeChar, EEscapeRestoreChar } from ".";

export const pairSplit = (str: string): string[] | null => str.match(/(..?)/g);

export const restoreEscape = (str: string[]): string => {
    let result: string = "";
    for (let i = 0; i < str.length; i++) {
        const isFlagBit: boolean = i === 0 || i === str.length - 1;
        if (isFlagBit) {
            result += str[i];
        } else {
            const is7D02: boolean = str[i] === EEscapeChar["7D"] && str[i + 1] === EEscapeChar["02"];
            const is7D01: boolean = str[i] === EEscapeChar["7D"] && str[i + 1] === EEscapeChar["01"];
            if (is7D02) {
                result += EEscapeRestoreChar["7E"];
                i += 1;
            } else if (is7D01) {
                result += EEscapeRestoreChar["7D"];
                i += 1;
            } else result += str[i];
        }
    }
    return result;
}

export const arrToString = (arr: string[]): string => arr.join("");

export const removeWhiteSpace = (str: string): string => str.replace(/\s+/g, "");

export const hexToBin = (hex: string): string => parseInt(hex, 16).toString(2).padStart(8, "0");

export const binToDec = (bin: string): number => parseInt(bin, 2);

export const hexToDec = (hex: string): number => parseInt(hex, 16);