import { TData } from ".";
import { arrToString, removeWhiteSpace } from "./lib";

export enum EMessageId {
    ["LocationInformationReport"] = "0200"
}

export interface IMeta {
    messageId: EMessageId
}

export default class Header {
    private readonly d: TData;

    constructor(str: TData) {
        this.d = str;
    }

    public meta(): IMeta {
        return {
            messageId: this.messageId
        };
    }

    private get messageId(): EMessageId {
        let result = this.d?.slice(0, 2);
        result = arrToString(result as string[]);
        result = removeWhiteSpace(result);
        return result as EMessageId;
    }
}