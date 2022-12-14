import Body from "./body";
import { arrToString, removeWhiteSpace } from "./lib";

export interface ITerminalAuthenticationData {
    authenticationCode: string,
}

export default class TerminalAuthentication extends Body {
    private readonly d: string[];

    constructor(str: string[]) {
        super(str);
        this.d = str;
    }

    public get data(): ITerminalAuthenticationData {
        return {
            authenticationCode: this.authenticationCode
        }
    }

    private get authenticationCode(): string {
        let result: string = arrToString(this.d);
        result = removeWhiteSpace(result);
        return result;
    }
}