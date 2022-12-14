import { pairSplit, restoreEscape } from "./lib";

export type TData = string | RegExpMatchArray | null;

export default class JT808 {
    private readonly d: TData;

    constructor(str: string) {
        this.d = this.deserialize(str);
    }

    private deserialize(str: string): RegExpMatchArray | null {
        let result: TData = str.toUpperCase().replace(/FLAGBIT/, "");
        result = pairSplit(result);
        result = restoreEscape(result as RegExpMatchArray);
        result = pairSplit(result);
        return result;
    }
}