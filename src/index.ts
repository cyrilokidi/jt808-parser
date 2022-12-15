import Header from "./header";
import { pairSplit, restoreEscape } from "./lib";
import LocationInformationReport from "./location-information-report";
import TerminalAuthentication from "./terminal-authentication";
import TerminalRegistration from "./terminal-registration";

export enum EEscapeChar {
    ["7D"] = "7D",
    ["01"] = "01",
    ["02"] = "02",
}

export enum EEscapeRestoreChar {
    ["7E"] = "7E",
    ["7D"] = "7D",
}

export enum EMessageId {
    ["LocationInformationReport"] = "0200",
    ["TerminalAuthentication"] = "0102",
    ["TerminalRegistration"] = "0100"
}

export interface IMessageBodyAttributes {
    messageBodyLength: number,
    dataEncyption: string,
    whetherToSubContract: string,
    reserve: string,
}

export interface IHeaderAttr {
    messageId: EMessageId,
    messageBodyAttributes: IMessageBodyAttributes,
    terminalPhoneNumber: string,
    messageSequenceNumber: number,
}

export interface ITerminalAuthenticationData {
    authenticationCode: string,
}

export interface ILocationBasicInformation {
    alarmSign: {
        emergencyAlarm: string,
        overspeedAlarm: string,
        drivingAlarmMalfunction: string,
        riskWarning: string,
        gnssModuleMalfunction: string,
        gnssAntennaWasNotConnectedOrCut: string,
        gnssAntennaShortCircuited: string,
        terminalMainPowerUndervoltage: string,
        terminalMainPowerIsTurnedOff: string,
        terminalLCDOrDisplayMalfunction: string,
        ttsModuleMalfunction: string,
        cameraMalfunction: string,
        roadTransportCertificateICCardModuleMalfunction: string,
        overspeedWarning: string,
        fatigueDrivingWarning: string,
        reserve: string,
        accumulatedOverspeedDrivingTimeOfTheDay: string,
        timeoutParking: string,
        enterAndExitTheArea: string,
        enterAndExitTheRoute: string,
        drivingTimeOfTheRouteIsNotEnoughOrTooLong: string,
        offTrackAlarm: string,
        vehicleVssMalfunction: string,
        abnormalFuelCapacityOfVehicle: string,
        vehicleIsStolen: string,
        illegalIgnitionOfVehicle: string,
        illegalDisplacementOfVehicle: string,
        collisionWarning: string,
        rolloverWarning: string,
        illegalOpenDoors: string,
    },
    status: {
        acc: string,
        positioning: string,
        latitude: string,
        longitude: string,
        running: string,
        latitudeLongitudeEncryption: string,
        reserve: string,
        load: string,
        vehicleOilLine: string,
        vehicleCircuit: string,
        vehicleDoor: string,
        door1: string,
        door2: string,
        door3: string,
        door4: string,
        door5: string,
        gpsPositioning: string,
        beidouPositioning: string,
        galileo: string,
        reserve2: string,
    },
    latitude: number,
    longitude: number,
    elevation: number,
    speed: number,
    direction: number,
    gpsTime: string,
}

export interface ILocationAdditionalInformation {

}

export interface ILocationInformationReportData {
    locationBasicInformation: ILocationBasicInformation,
    locationAdditionalInformation: ILocationAdditionalInformation,
}

export interface ILocationAdditionalInformationAttr {
    id?: string,
    length?: string,
    information?: string | string[] | number,
}

export type TBodyData =
    ITerminalAuthenticationData
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

    public get header(): IHeaderAttr {
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