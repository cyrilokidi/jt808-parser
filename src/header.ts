import { arrToString, binToDec, hexToBin, removeWhiteSpace } from "./lib";

export enum EMessageId {
    ["LocationInformationReport"] = "0200"
}

export interface IAttr {
    messageId: EMessageId,
    messageBodyLength: number,
    dataEncyption: string,
}

export default class Header {
    private readonly d: RegExpMatchArray;

    constructor(str: RegExpMatchArray) {
        this.d = str;
    }

    public attr(): IAttr {
        return {
            messageId: this.messageId,
            messageBodyLength: this.messageBodyLength,
            dataEncyption: this.dataEncyption,
        };
    }

    private get messageId(): EMessageId {
        let result: string | string[] = this.d.slice(0, 2);
        result = arrToString(result);
        result = removeWhiteSpace(result);
        return result as EMessageId;
    }

    private messageBodyAttributes(start: number, end: number): string {
        let result: string = "";
        this.d?.slice(2, 4).map((hex: string) => {
            result += hexToBin(hex);
        });
        result = result.slice(start, end);
        return result;
    }

    private get messageBodyLength(): number {
        let result: string | number = this.messageBodyAttributes(6, 15);
        result = binToDec(result);
        return result;
    }

    private get dataEncyption(): string {
        let result: string = this.messageBodyAttributes(3, 6);
        return result;
    }
}