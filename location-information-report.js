const Body = require("./body");
const { hexToBin } = require("./lib");

module.exports = class LocationInformationReport extends Body {
  d;

  constructor(str) {
    super(str);
    this.d = str;
  }

  get data() {
    return {
      locationBasicInformation: this.locationBasicInformation,
    };
  }

  alarmSign() {
    let result = "";
    this.d.slice(0, 4).map((hex) => {
      result += hexToBin(hex);
    });
    return result;
  }

  get locationBasicInformation() {
    const status = this.status;

    return {
      alarmSign: {
        emergencyAlarm: this.emergencyAlarm,
        overspeedAlarm: this.overspeedAlarm,
        drivingAlarmMalfunction: this.drivingAlarmMalfunction,
        riskWarning: this.riskWarning,
        gnssModuleMalfunction: this.gnssModuleMalfunction,
        gnssAntennaWasNotConnectedOrCut: this.gnssAntennaWasNotConnectedOrCut,
        gnssAntennaShortCircuited: this.gnssAntennaShortCircuited,
        terminalMainPowerUndervoltage: this.terminalMainPowerUndervoltage,
        terminalMainPowerIsTurnedOff: this.terminalMainPowerIsTurnedOff,
        terminalLCDOrDisplayMalfunction: this.terminalLCDOrDisplayMalfunction,
        ttsModuleMalfunction: this.ttsModuleMalfunction,
        cameraMalfunction: this.cameraMalfunction,
        roadTransportCertificateICCardModuleMalfunction:
          this.roadTransportCertificateICCardModuleMalfunction,
        overspeedWarning: this.overspeedWarning,
        fatigueDrivingWarning: this.fatigueDrivingWarning,
        reserve: this.alarmSignReserve,
        accumulatedOverspeedDrivingTimeOfTheDay:
          this.accumulatedOverspeedDrivingTimeOfTheDay,
        timeoutParking: this.timeoutParking,
        enterAndExitTheArea: this.enterAndExitTheArea,
        enterAndExitTheRoute: this.enterAndExitTheRoute,
        drivingTimeOfTheRouteIsNotEnoughOrTooLong:
          this.drivingTimeOfTheRouteIsNotEnoughOrTooLong,
        offTrackAlarm: this.offTrackAlarm,
        vehicleVssMalfunction: this.vehicleVssMalfunction,
        abnormalFuelCapacityOfVehicle: this.abnormalFuelCapacityOfVehicle,
        vehicleIsStolen: this.vehicleIsStolen,
        illegalIgnitionOfVehicle: this.illegalIgnitionOfVehicle,
        illegalDisplacementOfVehicle: this.illegalDisplacementOfVehicle,
        collisionWarning: this.collisionWarning,
        rolloverWarning: this.rolloverWarning,
        illegalOpenDoors: this.illegalOpenDoors,
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
    };
  }

  get emergencyAlarm() {
    let result = this.alarmSign();
    result = result[result.length - 1];
    return result;
  }

  get overspeedAlarm() {
    let result = this.alarmSign();
    result = result[result.length - 2];
    return result;
  }

  get drivingAlarmMalfunction() {
    let result = this.alarmSign();
    result = result[result.length - 3];
    return result;
  }

  get riskWarning() {
    let result = this.alarmSign();
    result = result[result.length - 4];
    return result;
  }

  get gnssModuleMalfunction() {
    let result = this.alarmSign();
    result = result[result.length - 5];
    return result;
  }

  get gnssAntennaWasNotConnectedOrCut() {
    let result = this.alarmSign();
    result = result[result.length - 6];
    return result;
  }

  get gnssAntennaShortCircuited() {
    let result = this.alarmSign();
    result = result[result.length - 7];
    return result;
  }

  get terminalMainPowerUndervoltage() {
    let result = this.alarmSign();
    result = result[result.length - 8];
    return result;
  }
  get terminalMainPowerIsTurnedOff() {
    let result = this.alarmSign();
    result = result[result.length - 9];
    return result;
  }

  get terminalLCDOrDisplayMalfunction() {
    let result = this.alarmSign();
    result = result[result.length - 10];
    return result;
  }

  get ttsModuleMalfunction() {
    let result = this.alarmSign();
    result = result[result.length - 11];
    return result;
  }

  get cameraMalfunction() {
    let result = this.alarmSign();
    result = result[result.length - 12];
    return result;
  }

  get roadTransportCertificateICCardModuleMalfunction() {
    let result = this.alarmSign();
    result = result[result.length - 13];
    return result;
  }

  get overspeedWarning() {
    let result = this.alarmSign();
    result = result[result.length - 14];
    return result;
  }

  get fatigueDrivingWarning() {
    let result = this.alarmSign();
    result = result[result.length - 15];
    return result;
  }

  get alarmSignReserve() {
    let result = this.alarmSign();
    result = result.slice(result.length - 18, result.length - 16);
    return result;
  }

  get accumulatedOverspeedDrivingTimeOfTheDay() {
    let result = this.alarmSign();
    result = result[result.length - 19];
    return result;
  }

  get timeoutParking() {
    let result = this.alarmSign();
    result = result[result.length - 20];
    return result;
  }

  get enterAndExitTheArea() {
    let result = this.alarmSign();
    result = result[result.length - 21];
    return result;
  }

  get enterAndExitTheRoute() {
    let result = this.alarmSign();
    result = result[result.length - 22];
    return result;
  }

  get drivingTimeOfTheRouteIsNotEnoughOrTooLong() {
    let result = this.alarmSign();
    result = result[result.length - 23];
    return result;
  }

  get offTrackAlarm() {
    let result = this.alarmSign();
    result = result[result.length - 24];
    return result;
  }

  get vehicleVssMalfunction() {
    let result = this.alarmSign();
    result = result[result.length - 25];
    return result;
  }

  get abnormalFuelCapacityOfVehicle() {
    let result = this.alarmSign();
    result = result[result.length - 26];
    return result;
  }

  get vehicleIsStolen() {
    let result = this.alarmSign();
    result = result[result.length - 27];
    return result;
  }

  get illegalIgnitionOfVehicle() {
    let result = this.alarmSign();
    result = result[result.length - 28];
    return result;
  }

  get illegalDisplacementOfVehicle() {
    let result = this.alarmSign();
    result = result[result.length - 29];
    return result;
  }

  get collisionWarning() {
    let result = this.alarmSign();
    result = result[result.length - 30];
    return result;
  }

  get rolloverWarning() {
    let result = this.alarmSign();
    result = result[result.length - 31];
    return result;
  }

  get illegalOpenDoors() {
    let result = this.alarmSign();
    result = result[result.length - 32];
    return result;
  }

  get status() {
    let result = "";
    this.d.slice(4, 8).map((hex) => {
      result += hexToBin(hex);
    });
    return result;
  }
};
