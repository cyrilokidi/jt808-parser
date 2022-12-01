const { arrToString, removeWhiteSpace, hexToDec } = require("./lib");

module.exports = class Header {
  d;

  constructor(str) {
    this.d = str;
  }

  get props() {
    return {
      type: this.type(this.messageId),
    };
  }

  get messageId() {
    let result = this.d.slice(0, 2);
    result = arrToString(result);
    result = removeWhiteSpace(result);
    result = hexToDec(result);
    return result;
  }

  type(msgId) {
    switch (msgId) {
      case 512:
        return "LOCATION_INFORMATION_REPORT";

      default:
        throw new Error("Invalid message type.");
    }
  }
};
