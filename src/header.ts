import { arrToString, binToDec, hexToBin, hexToDec, removeWhiteSpace } from "./lib";

export enum EMessageId {
    ["LocationInformationReport"] = "0200",
    ["TerminalAuthentication"] = "0102",
}

export interface IMessageBodyAttributes {
    messageBodyLength: number,
    dataEncyption: string,
    whetherToSubContract: string,
    reserve: string,
}

export interface IAttr {
    messageId: EMessageId,
    messageBodyAttributes: IMessageBodyAttributes,
    terminalPhoneNumber: string,
    messageSequenceNumber: number,
}

export default class Header {
    private readonly d: string[];

    constructor(str: string[]) {
        this.d = str;
    }

    public get attr(): IAttr {
        return {
            messageId: this.messageId,
            messageBodyAttributes: {
                messageBodyLength: this.messageBodyLength,
                dataEncyption: this.dataEncyption,
                whetherToSubContract: this.whetherToSubContract,
                reserve: this.reserve,
            },
            terminalPhoneNumber: this.terminalPhoneNumber,
            messageSequenceNumber: this.messageSequenceNumber,
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

    private get whetherToSubContract(): string {
        let result: string = this.messageBodyAttributes(2, 3);
        return result;
    }

    private get reserve(): string {
        let result: string = this.messageBodyAttributes(0, 2);
        return result;
    }

    private get terminalPhoneNumber(): string {
        let result: string | string[] = this.d.slice(4, 10);
        result = arrToString(result);
        return result;
    }

    private get messageSequenceNumber(): number {
        let result: string | string[] | number = this.d.slice(10, 12);
        result = arrToString(result);
        result = removeWhiteSpace(result);
        result = hexToDec(result);
        return result;
    }
}