import Header, { EMessageId, IAttr } from "./header";
import { pairSplit, restoreEscape } from "./lib";
import LocationInformationReport, { ILocationInformationReportData } from "./location-information-report";
import TerminalAuthentication, { ITerminalAuthenticationData } from "./terminal-authentication";
import TerminalRegistration from "./terminal-registration";

export type TBodyData = ITerminalAuthenticationData
    | string[]
    | ILocationInformationReportData;

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

    public get body(): TBodyData {
        const b: string[] = this.d.slice(13, this.d.length - 2);

        switch (this.header.messageId) {
            case EMessageId["TerminalAuthentication"]:
                const terminalAuthentication = new TerminalAuthentication(b);
                return terminalAuthentication.data;

            case EMessageId["TerminalRegistration"]:
                const terminalRegistration = new TerminalRegistration(b);
                return terminalRegistration.data;

            case EMessageId["LocationInformationReport"]:
                const locationInformationReport = new LocationInformationReport(b);
                return locationInformationReport.data;

            default:
                throw new Error(`Invalid message id "${this.header.messageId}"`);
        }
    }
}