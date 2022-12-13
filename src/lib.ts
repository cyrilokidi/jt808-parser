export const pairSplit = (str: string): RegExpMatchArray | null => str.match(/(..?)/g);

export enum EEscapeChar {
    ["7D"] = "7D",
    ["01"] = "01",
    ["02"] = "02",
}

export enum EEscapeRestoreChar {
    ["7E"] = "7E",
    ["7D"] = "7D",
}

export const restoreEscape = (str: RegExpMatchArray): string => {
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