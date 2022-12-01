const Header = require("./header");
const { pairSplit, restoreEscape } = require("./lib");

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
};
