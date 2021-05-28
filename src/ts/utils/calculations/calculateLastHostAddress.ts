import IP from "../../interfaces/IP";
import binToDec from "../converters/binToDec";

//referenceAddress is broadcast in case of max and network in case of min
const calculateMinMaxHostAddress = (referenceAddress: IP, type: "min" | "max"): IP => {
  const ipObject: IP = {
    binary: {
      octets: null,
      string: null,
    },
    decimal: {
      octets: null,
      string: null,
    },
  };
  ipObject.binary.octets = [...referenceAddress.binary.octets];
  const lastOctet = ipObject.binary.octets[3];
  const lastOctetAsArray = lastOctet.split("");
  lastOctetAsArray[7] = type === "max" ? "0" : "1";
  const lastOctetWithChanges = lastOctetAsArray.join("");
  ipObject.binary.octets[3] = lastOctetWithChanges;

  ipObject.binary.string = ipObject.binary.octets.join(".");
  ipObject.decimal.octets = ipObject.binary.octets.map((o) => binToDec(o));
  ipObject.decimal.string = ipObject.decimal.octets.join(".");
  return ipObject;
};

export default calculateMinMaxHostAddress;
