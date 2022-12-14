export default class Body {
    private readonly d: string[];

    constructor(str: string[]) {
        this.d = str;
    }

    public get data(): string[] {
        return this.d;
    }
}