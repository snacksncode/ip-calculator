import decToBin from "./decToBin";

interface ParsedIPObject {
  decimal: {
    string: string;
    octets: number[];
  };
  binary: {
    string: string;
    octets: string[];
  };
}

const parseIP = (ipString: string): ParsedIPObject => {
  //split ip into octets
  const ipOctets = ipString.split(".").map((octet) => Number(octet));
  //check if ip is right
  checkForErrors(ipOctets);
  //if no errors are thrown in function above ip is correct and we can proceed
  const ipOctetsBin = ipOctets.map((octet) => {
    const octetNum = Number(octet);
    const octetBin = decToBin(octetNum);
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

const checkForErrors = (ipOctets: number[]) => {
  let errorString = "";
  ipOctets.map((octet, index) => {
    if (octet == null) errorString = `Incorrect value [${octet}] in octet #${index + 1}. Value is not a number`;
    if (octet > 255) errorString = `Incorrect value [${octet}] in octet #${index + 1}. Value is above 255`;
    if (octet < 0) errorString = `Incorrect value [${octet}] in octet #${index + 1}. Value is less than 0`;
  });

  if (!!errorString) {
    throw new Error(`Error while parsing IP: ${ipOctets.join(".")} | Error: ${errorString}`);
  }
};

export default parseIP;
