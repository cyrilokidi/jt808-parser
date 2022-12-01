module.exports.pairSplit = (str) => str.match(/(..?)/g);

module.exports.restoreEscape = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const isFlagBit = i === 0 || i === str.length - 1;
    if (isFlagBit) {
      result += str[i];
    } else {
      const is7D02 = str[i] === "7D" && str[i + 1] === "02";
      const is7D01 = str[i] === "7D" && str[i + 1] === "01";
      if (is7D02) {
        result += "7E";
        i += 1;
      } else if (is7D01) {
        result += "7D";
        i += 1;
      } else result += str[i];
    }
  }
  return result;
};

module.exports.removeWhiteSpace = (str) => str.replace(/\s+/g, "");

module.exports.hexToDec = (hex) => parseInt(hex, 16);

module.exports.hexToBin = (hex) =>
  parseInt(hex, 16).toString(2).padStart(8, "0");

module.exports.binToDec = (bin) => parseInt(bin, 2);

module.exports.arrToString = (arr) => arr.join("");
