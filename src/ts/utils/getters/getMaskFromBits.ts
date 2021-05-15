const getMaskFromBits = (bits: number) => {
  checkForErrors(bits);
  switch (bits) {
    case 0:
      return "0.0.0.0";
    case 1:
      return "128.0.0.0";
    case 2:
      return "192.0.0.0";
    case 3:
      return "224.0.0.0";
    case 4:
      return "240.0.0.0";
    case 5:
      return "248.0.0.0";
    case 6:
      return "252.0.0.0";
    case 7:
      return "254.0.0.0";
    case 8:
      return "255.0.0.0";
    case 9:
      return "255.128.0.0";
    case 10:
      return "255.192.0.0";
    case 11:
      return "255.224.0.0";
    case 12:
      return "255.240.0.0";
    case 13:
      return "255.248.0.0";
    case 14:
      return "255.252.0.0";
    case 15:
      return "255.254.0.0";
    case 16:
      return "255.255.0.0";
    case 17:
      return "255.255.128.0";
    case 18:
      return "255.255.192.0";
    case 19:
      return "255.255.224.0";
    case 20:
      return "255.255.240.0";
    case 21:
      return "255.255.248.0";
    case 22:
      return "255.255.252.0";
    case 23:
      return "255.255.254.0";
    case 24:
      return "255.255.255.0";
    case 25:
      return "255.255.255.128";
    case 26:
      return "255.255.255.192";
    case 27:
      return "255.255.255.224";
    case 28:
      return "255.255.255.240";
    case 29:
      return "255.255.255.248";
    case 30:
      return "255.255.255.252";
    case 31:
      return "255.255.255.254";
    case 32:
      return "255.255.255.255";
  }
};

const checkForErrors = (bits: number) => {
  let errorString = "";
  if (bits > 32) {
    errorString = "Incorrect amount of bits. Value is above 32";
  }
  if (bits < 0) {
    errorString = "Incorrect amount of bits. Value is less than 0";
  }
  if (!!errorString) {
    throw new Error(`Error while parsing mask | Error: ${errorString}`);
  }
};

export default getMaskFromBits;
