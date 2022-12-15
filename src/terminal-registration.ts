import Body from "./body";

export default class TerminalRegistration extends Body {
    private readonly d: string[];

    constructor(str: string[]) {
        super(str);
        this.d = str;
    }

    public get data(): string[] {
        return this.d;
    }
}