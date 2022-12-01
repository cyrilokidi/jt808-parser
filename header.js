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
      messageType: this.messageType(this.messageId),
      messageBodyAttributes: {
        messageBodyLength: this.messageBodyLength,
        dataEncyption: this.dataEncyption,
        wheatherToSubContract: this.wheatherToSubContract,
      },
    };
  }

  get messageId() {
    let result = this.d.slice(0, 2);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    result = hexToDec(result);
    return result;
  }

  messageType(msgId) {
    switch (msgId) {
      case 512:
        return "LOCATION_INFORMATION_REPORT";

      default:
        throw new Error("Invalid message type.");
    }
  }

  messageBodyAttributes(attr) {
    let result = "";
    this.d.slice(2, 4).map((hex) => {
      result += hexToBin(hex);
    });
    result = result.slice(attr);
    return result;
  }

  get messageBodyLength() {
    let result = this.messageBodyAttributes(6, 16);
    result = binToDec(result);
    return result;
  }

  get dataEncyption() {
    let result = this.messageBodyAttributes(3, 6);
    const [third, second, first] = result;
    if (first === "0" && second === "0" && third === "0") {
      result = "None";
    } else if (first) {
      result = "RSA";
    } else result = "Reserved";
    return result;
  }

  get wheatherToSubContract() {
    let result = this.messageBodyAttributes(2, 3);
    result = result === "1" ? "Long Message" : "Not Long Message";
    return result;
  }
};
