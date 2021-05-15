import IP from "../../interfaces/IP";
import decToBin from "../converters/decToBin";

const parseIP = async (ipString: string): Promise<IP> => {
  //split ip into octets
  const rawIpOctets = ipString.split(".");
  const ipOctets = rawIpOctets.map((octet) => Number(octet));
  //check if ip is right
  checkForErrors(ipOctets, rawIpOctets);
  //if no errors are thrown in function above ip is correct and we can proceed
  const ipOctetsBin = ipOctets.map((octet) => {
    const octetBin = decToBin(octet);
    const octetBinFormatted = octetBin.padStart(8, "0");
    return octetBinFormatted;
  });
  return {
    decimal: {
      string: ipOctets.join("."),
      octets: ipOctets,
    },
    binary: {
      string: ipOctetsBin.join("."),
      octets: ipOctetsBin,
    },
  };
};

const checkForErrors = (ipOctets: number[], rawIpOctets: string[]) => {
  let errorString = "";
  ipOctets.map((octet, index) => {
    if (Number.isNaN(octet)) {
      errorString = `Incorrect value [${rawIpOctets[index]}] in octet #${index + 1}. | Value is not a number`;
    }
    if (octet > 255) {
      errorString = `Incorrect value [${rawIpOctets[index]}] in octet #${index + 1}. | Value is above 255`;
    }
    if (octet < 0) {
      errorString = `Incorrect value [${rawIpOctets[index]}] in octet #${index + 1}. | Value is less than 0`;
    }
  });
  if (!!errorString) {
    throw new Error(`Error while parsing IP: ${rawIpOctets.join(".")} | Error: ${errorString}`);
  }
};

export default parseIP;
