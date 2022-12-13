const Header = require("./header");
const { pairSplit, restoreEscape } = require("./lib");
const LocationInformationReport = require("./location-information-report");
const TerminalAuthentication = require("./terminal-authentication");
const TerminalRegistration = require("./terminal-registration");

module.exports = class JT808 {
  d;

  constructor(str) {
    this.d = this.deserialize(str);
  }

  deserialize(str) {
    let result = str.toUpperCase().replace(/FLAGBIT/, "");
    result = pairSplit(result);
    result = restoreEscape(result);
    result = pairSplit(result);
    return result;
  }

  get header() {
    const prop = this.d.slice(1, 13);
    const h = new Header(prop);
    return h.props;
  }

  get body() {
    const b = this.d.slice(13, this.d.length - 2);

    switch (this.header.messageId) {
      case "0200":
        const locationInformationReport = new LocationInformationReport(b);
        return locationInformationReport.data;

      case "0102":
        const terminalAuthentication = new TerminalAuthentication(b);
        return terminalAuthentication.data;

      case "0100":
        const terminalRegistration = new TerminalRegistration(b);
        return terminalRegistration.data;

      default:
        throw new Error("Invalid message type.");
    }
  }
};
