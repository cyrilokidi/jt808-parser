const Body = require("./body");

module.exports = class LocationInformationReport extends Body {
  d;

  constructor(str) {
    super(str);
    this.d = str;
  }

  get data() {
    return this.d;
  }
};
