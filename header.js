const {
  arrToString,
  removeWhiteSpace,
  hexToDec,
  hexToBin,
  binToDec,
} = require("./lib");

module.exports = class Header {
  d;

  constructor(str) {
    this.d = str;
  }

  get props() {
    return {
      messageId: this.messageId,
      messageBodyAttributes: {
        messageBodyLength: this.messageBodyLength,
        dataEncyption: this.dataEncyption,
        wheatherToSubContract: this.wheatherToSubContract,
        reserve: this.reserve,
      },
      terminalPhoneNumber: this.terminalPhoneNumber,
      messageSequenceNumber: this.messageSequenceNumber,
    };
  }

  get messageId() {
    let result = this.d.slice(0, 2);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    return result;
  }

  messageBodyAttributes(...attr) {
    let result = "";
    this.d.slice(2, 4).map((hex) => {
      result += hexToBin(hex);
    });
    result = result.slice(...attr);
    return result;
  }

  get messageBodyLength() {
    let result = this.messageBodyAttributes(6, 15);
    result = binToDec(result);
    return result;
  }

  get dataEncyption() {
    let result = this.messageBodyAttributes(3, 6);
    return result;
  }

  get wheatherToSubContract() {
    let result = this.messageBodyAttributes(2, 3);
    return result;
  }

  get reserve() {
    let result = this.messageBodyAttributes(0, 2);
    return result;
  }

  get terminalPhoneNumber() {
    let result = this.d.slice(4, 10);
    result = arrToString(result);
    return result;
  }

  get messageSequenceNumber() {
    let result = this.d.slice(10, 12);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    result = hexToDec(result);
    return result;
  }
};
