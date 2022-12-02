const Body = require("./body");
const { hexToBin, arrToString, removeWhiteSpace, hexToDec } = require("./lib");

module.exports = class LocationInformationReport extends Body {
  d;

  constructor(str) {
    super(str);
    this.d = str;
  }

  get data() {
    return {
      locationBasicInformation: this.locationBasicInformation,
      locationAdditionalInformation: this.locationAdditionalInformation,
    };
  }

  get locationBasicInformation() {
    const alarmSign = this.alarmSign;
    const status = this.status;

    return {
      alarmSign: {
        emergencyAlarm: alarmSign[alarmSign.length - 1],
        overspeedAlarm: alarmSign[alarmSign.length - 2],
        drivingAlarmMalfunction: alarmSign[alarmSign.length - 3],
        riskWarning: alarmSign[alarmSign.length - 4],
        gnssModuleMalfunction: alarmSign[alarmSign.length - 5],
        gnssAntennaWasNotConnectedOrCut: alarmSign[alarmSign.length - 6],
        gnssAntennaShortCircuited: alarmSign[alarmSign.length - 7],
        terminalMainPowerUndervoltage: alarmSign[alarmSign.length - 8],
        terminalMainPowerIsTurnedOff: alarmSign[alarmSign.length - 9],
        terminalLCDOrDisplayMalfunction: alarmSign[alarmSign.length - 10],
        ttsModuleMalfunction: alarmSign[alarmSign.length - 11],
        cameraMalfunction: alarmSign[alarmSign.length - 12],
        roadTransportCertificateICCardModuleMalfunction:
          alarmSign[alarmSign.length - 13],
        overspeedWarning: alarmSign[alarmSign.length - 14],
        fatigueDrivingWarning: alarmSign[alarmSign.length - 15],
        reserve: alarmSign.slice(alarmSign.length - 18, alarmSign.length - 15),
        accumulatedOverspeedDrivingTimeOfTheDay:
          alarmSign[alarmSign.length - 19],
        timeoutParking: alarmSign[alarmSign.length - 20],
        enterAndExitTheArea: alarmSign[alarmSign.length - 21],
        enterAndExitTheRoute: alarmSign[alarmSign.length - 22],
        drivingTimeOfTheRouteIsNotEnoughOrTooLong:
          alarmSign[alarmSign.length - 23],
        offTrackAlarm: alarmSign[alarmSign.length - 24],
        vehicleVssMalfunction: alarmSign[alarmSign.length - 25],
        abnormalFuelCapacityOfVehicle: alarmSign[alarmSign.length - 26],
        vehicleIsStolen: alarmSign[alarmSign.length - 27],
        illegalIgnitionOfVehicle: alarmSign[alarmSign.length - 28],
        illegalDisplacementOfVehicle: alarmSign[alarmSign.length - 29],
        collisionWarning: alarmSign[alarmSign.length - 30],
        rolloverWarning: alarmSign[alarmSign.length - 31],
        illegalOpenDoors: alarmSign[alarmSign.length - 32],
      },
      status: {
        acc: status[status.length - 1],
        positioning: status[status.length - 2],
        latitude: status[status.length - 3],
        longitude: status[status.length - 4],
        running: status[status.length - 5],
        latitudeLongitudeEncryption: status[status.length - 6],
        reserve: status.slice(status.length - 9, status.length - 7),
        load: status[status.length - 10],
        vehicleOilLine: status[status.length - 11],
        vehicleCircuit: status[status.length - 12],
        vehicleDoor: status[status.length - 13],
        door1: status[status.length - 14],
        door2: status[status.length - 15],
        door3: status[status.length - 16],
        door4: status[status.length - 17],
        door5: status[status.length - 18],
        gpsPositioning: status[status.length - 19],
        beidouPositioning: status[status.length - 20],
        galileo: status[status.length - 21],
        reserve2: status.slice(status.length - 32, status.length - 22),
      },
      latitude: this.latitude,
      longitude: this.longitude,
      elevation: this.elevation,
      speed: this.speed,
      direction: this.direction,
      gpsTime: this.gpsTime,
    };
  }

  get alarmSign() {
    let result = "";
    this.d.slice(0, 4).map((hex) => {
      result += hexToBin(hex);
    });
    return result;
  }

  get status() {
    let result = "";
    this.d.slice(4, 8).map((hex) => {
      result += hexToBin(hex);
    });
    return result;
  }

  get latitude() {
    let result = this.d.slice(8, 12);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    result = hexToDec(result);
    return result;
  }

  get longitude() {
    let result = this.d.slice(12, 16);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    result = hexToDec(result);
    return result;
  }

  get elevation() {
    let result = this.d.slice(16, 18);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    result = hexToDec(result);
    return result;
  }

  get speed() {
    let result = this.d.slice(18, 20);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    result = hexToDec(result);
    return result;
  }

  get direction() {
    let result = this.d.slice(20, 22);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    result = hexToDec(result);
    return result;
  }

  get gpsTime() {
    let result = this.d.slice(22, 28);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    return result;
  }

  get locationAdditionalInformation() {
    const props = this.d.slice(28);
    let result = [];
    for (let i = 0; i < props.length; i++) {
      const item = {};
      item.id = props[i];
      item.length = props[i + 1];
      item.information = props.slice(i + 2, i + 2 + Number(item.length));
      result.push(item);
      i += i + 1 + Number(item.length);
    }
    return result;
  }
};
