import { ILocationAdditionalInformationAttr, ILocationBasicInformation, ILocationInformationReportData } from ".";
import Body from "./body";
import { arrToString, hexToBin, hexToDec, removeWhiteSpace } from "./lib";

export default class LocationInformationReport extends Body {
    private readonly d: string[];

    constructor(str: string[]) {
        super(str);
        this.d = str;
    }

    public get data(): ILocationInformationReportData {
        return {
            locationBasicInformation: this.locationBasicInformation,
            locationAdditionalInformation: this.locationAdditionalInformation,
        }
    }

    private get locationBasicInformation(): ILocationBasicInformation {
        return {
            alarmSign: {
                emergencyAlarm: this.alarmSign[this.alarmSign.length - 1],
                overspeedAlarm: this.alarmSign[this.alarmSign.length - 2],
                drivingAlarmMalfunction: this.alarmSign[this.alarmSign.length - 3],
                riskWarning: this.alarmSign[this.alarmSign.length - 4],
                gnssModuleMalfunction: this.alarmSign[this.alarmSign.length - 5],
                gnssAntennaWasNotConnectedOrCut: this.alarmSign[this.alarmSign.length - 6],
                gnssAntennaShortCircuited: this.alarmSign[this.alarmSign.length - 7],
                terminalMainPowerUndervoltage: this.alarmSign[this.alarmSign.length - 8],
                terminalMainPowerIsTurnedOff: this.alarmSign[this.alarmSign.length - 9],
                terminalLCDOrDisplayMalfunction: this.alarmSign[this.alarmSign.length - 10],
                ttsModuleMalfunction: this.alarmSign[this.alarmSign.length - 11],
                cameraMalfunction: this.alarmSign[this.alarmSign.length - 12],
                roadTransportCertificateICCardModuleMalfunction:
                    this.alarmSign[this.alarmSign.length - 13],
                overspeedWarning: this.alarmSign[this.alarmSign.length - 14],
                fatigueDrivingWarning: this.alarmSign[this.alarmSign.length - 15],
                reserve: this.alarmSign.slice(this.alarmSign.length - 18, this.alarmSign.length - 15),
                accumulatedOverspeedDrivingTimeOfTheDay:
                    this.alarmSign[this.alarmSign.length - 19],
                timeoutParking: this.alarmSign[this.alarmSign.length - 20],
                enterAndExitTheArea: this.alarmSign[this.alarmSign.length - 21],
                enterAndExitTheRoute: this.alarmSign[this.alarmSign.length - 22],
                drivingTimeOfTheRouteIsNotEnoughOrTooLong:
                    this.alarmSign[this.alarmSign.length - 23],
                offTrackAlarm: this.alarmSign[this.alarmSign.length - 24],
                vehicleVssMalfunction: this.alarmSign[this.alarmSign.length - 25],
                abnormalFuelCapacityOfVehicle: this.alarmSign[this.alarmSign.length - 26],
                vehicleIsStolen: this.alarmSign[this.alarmSign.length - 27],
                illegalIgnitionOfVehicle: this.alarmSign[this.alarmSign.length - 28],
                illegalDisplacementOfVehicle: this.alarmSign[this.alarmSign.length - 29],
                collisionWarning: this.alarmSign[this.alarmSign.length - 30],
                rolloverWarning: this.alarmSign[this.alarmSign.length - 31],
                illegalOpenDoors: this.alarmSign[this.alarmSign.length - 32],
            },
            status: {
                acc: this.status[this.status.length - 1],
                positioning: this.status[this.status.length - 2],
                latitude: this.status[this.status.length - 3],
                longitude: this.status[this.status.length - 4],
                running: this.status[this.status.length - 5],
                latitudeLongitudeEncryption: this.status[this.status.length - 6],
                reserve: this.status.slice(this.status.length - 9, this.status.length - 7),
                load: this.status[this.status.length - 10],
                vehicleOilLine: this.status[this.status.length - 11],
                vehicleCircuit: this.status[this.status.length - 12],
                vehicleDoor: this.status[this.status.length - 13],
                door1: this.status[this.status.length - 14],
                door2: this.status[this.status.length - 15],
                door3: this.status[this.status.length - 16],
                door4: this.status[this.status.length - 17],
                door5: this.status[this.status.length - 18],
                gpsPositioning: this.status[this.status.length - 19],
                beidouPositioning: this.status[this.status.length - 20],
                galileo: this.status[this.status.length - 21],
                reserve2: this.status.slice(this.status.length - 32, this.status.length - 22),
            },
            latitude: this.latitude,
            longitude: this.longitude,
            elevation: this.elevation,
            speed: this.speed,
            direction: this.direction,
            gpsTime: this.gpsTime,
        };
    }

    private get alarmSign(): string {
        let result: string = "";
        this.d.slice(0, 4).map((hex: string) => {
            result += hexToBin(hex);
        });
        return result;
    }

    private get status(): string {
        let result: string = "";
        this.d.slice(4, 8).map((hex: string) => {
            result += hexToBin(hex);
        });
        return result;
    }

    private get latitude(): number {
        let result: string | string[] | number = this.d.slice(8, 12);
        result = arrToString(result);
        result = removeWhiteSpace(result);
        result = hexToDec(result);
        return result;
    }

    private get longitude(): number {
        let result: string | string[] | number = this.d.slice(12, 16);
        result = arrToString(result);
        result = removeWhiteSpace(result);
        result = hexToDec(result);
        return result;
    }

    private get elevation(): number {
        let result: string | string[] | number = this.d.slice(16, 18);
        result = arrToString(result);
        result = removeWhiteSpace(result);
        result = hexToDec(result);
        return result;
    }

    private get speed(): number {
        let result: string | string[] | number = this.d.slice(18, 20);
        result = arrToString(result);
        result = removeWhiteSpace(result);
        result = hexToDec(result);
        return result;
    }

    private get direction(): number {
        let result: string | string[] | number = this.d.slice(20, 22);
        result = arrToString(result);
        result = removeWhiteSpace(result);
        result = hexToDec(result);
        return result;
    }

    private get gpsTime(): string {
        let result: string | string[] = this.d.slice(22, 28);
        result = arrToString(result);
        result = removeWhiteSpace(result);
        return result;
    }

    private get locationAdditionalInformation(): ILocationAdditionalInformationAttr[] {
        const props: string[] = this.d.slice(28);
        let result: ILocationAdditionalInformationAttr[] = [];
        let i = 0;
        while (i < props.length) {
            const item: ILocationAdditionalInformationAttr = {};
            item.id = props[i];
            item.length = props[i + 1];
            item.information = props.slice(
                i + 1 + 1,
                i + 1 + 1 + Number(item.length)
            );
            item.information = arrToString(item.information);
            item.information = removeWhiteSpace(item.information);
            item.information = hexToDec(item.information);
            result.push(item);
            i += 1 + 1 + Number(item.length);
        }
        return result;
    }
}