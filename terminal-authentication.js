const Body = require("./body");
const { arrToString, removeWhiteSpace } = require("./lib");

module.exports = class TerminalAuthentication extends Body {
  d;

  constructor(str) {
    super(str);
    this.d = str;
  }

  get data() {
    return {
      authenticationCode: this.authenticationCode,
    };
  }

  get authenticationCode() {
    let result = arrToString(this.d);
    result = removeWhiteSpace(result);
    return result;
  }
};
