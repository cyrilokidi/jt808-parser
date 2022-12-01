module.exports = class Body {
  d;

  constructor(str) {
    this.d = str;
  }

  get data() {
    return this.d;
  }
};
