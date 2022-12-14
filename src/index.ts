import Header, { IAttr } from "./header";
import { pairSplit, restoreEscape } from "./lib";

export default class JT808 {
    private readonly d: string[];

    constructor(str: string) {
        this.d = this.deserialize(str);
    }

    private deserialize(str: string): string[] {
        let result: string | string[] | null = str.toUpperCase().replace(/FLAGBIT/, "");
        result = pairSplit(result);
        result = restoreEscape(result as string[]);
        result = pairSplit(result);
        return result as string[];
    }

    public get header(): IAttr {
        const p: string[] = this.d?.slice(1, 13);
        const h = new Header(p);
        return h.attr;
    }
}