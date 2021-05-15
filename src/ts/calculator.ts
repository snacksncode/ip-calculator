import "../scss/main.scss";
import Params from "./interfaces/Params";
import getMaskFromBits from "./utils/getMaskFromBits";
import parseIP from "./utils/parseIP";
import parseURLParams from "./utils/parseURLParams";
import getUserIP from "./utils/getUserIP";
import IP from "./interfaces/IP";
import Mask from "./interfaces/Mask";
import nearestMultiple from "./utils/nearestMultiple";
import binToDec from "./utils/binToDec";
import MaskValidity from "./interfaces/MaskValidity";

const getParams = async (): Promise<Params> => {
  const rawParams = parseURLParams();
  //check if both parameters were passed
  if (!rawParams.hasOwnProperty("ip") || !rawParams.hasOwnProperty("mask")) throw new Error("Missing IP or MASK parameters");
  let ip: IP = null;
  //if no ip is provided use user ip, otherwise parse given ip
  if (rawParams.ip !== "") {
    ip = await parseIP(rawParams.ip?.toString());
  } else {
    const userIP = await getUserIP();
    ip = await parseIP(userIP);
  }
  //parse mask
  const mask = await parseIP(getMaskFromBits(Number(rawParams.mask)));
  //return parsed objects
  return {
    ip,
    mask: {
      ...mask,
      bits: Number(rawParams.mask),
    },
  };
};

const modifyIPViaMask = (ip: IP, mask: Mask, modifyWithBit: "0" | "1"): IP => {
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
  const affectedOctetsFromIndex = getAffectedOctetsIndexFromMask(mask);
  // console.log("from index (including)", affectedOctetsFromIndex);
  const affectedOctetsBin = ip.binary.octets.filter((_o, i) => i >= affectedOctetsFromIndex);
  // const affectedOctets = ip.decimal.octets.filter((_o, i) => i >= affectedOctetsFromIndex);
  // console.log("aff", affectedOctets);
  const closestOctetEnd = nearestMultiple(mask.bits, 8);
  const affectedSinceBit = closestOctetEnd - mask.bits === 0 ? 0 : 8 - (closestOctetEnd - mask.bits);
  // console.log(affectedSinceBit);
  const affectedOctetsBinWithChanges = affectedOctetsBin.map((octet, index) => {
    if (index === 0) {
      //we split octet into an array of bits
      const octetAsArray = octet.split("");
      //for every bit we check if it's index is within "affected" range if so we change it to "1" else we leave it as it is
      const changedOctetAsArray = octetAsArray.map((bit, index) => {
        if (index < affectedSinceBit) return bit;
        return modifyWithBit;
      });
      //now that we have an array of bits that represent our octet with changes we can "reassemble" it back with .join()
      return changedOctetAsArray.join("");
    }
    //if it's not the first affected octet (means it'll just be all 1's or 0's) we return string "11111111"
    return modifyWithBit.repeat(8);
  });
  //now that we have our new octets with changes and we know from which index whose octets start we can do a combination of our old
  //octets and our new ones by replacing octets that are affected in original with the newly calculated ones
  const unchangedOctets = ip.binary.octets.filter((_o, i) => i < affectedOctetsFromIndex);
  const octetsWithChanges = unchangedOctets.concat(affectedOctetsBinWithChanges);
  const octetsWithChangesDec = octetsWithChanges.map((octet) => binToDec(octet));
  const octetsWithChangesString = octetsWithChanges.join(".");
  const octetsWithChangesDecString = octetsWithChangesDec.join(".");

  ipObject.binary.octets = octetsWithChanges;
  ipObject.binary.string = octetsWithChangesString;
  ipObject.decimal.octets = octetsWithChangesDec;
  ipObject.decimal.string = octetsWithChangesDecString;

  return ipObject;
};

const checkMaskValidity = (ip: IP, mask: Mask): MaskValidity => {
  const validity: MaskValidity = {
    valid: true,
    reason: null,
  };
  const firstOctetDec = ip.decimal.octets[0];
  const maskBits = mask.bits;

  if (firstOctetDec >= 1 && firstOctetDec <= 127 && maskBits < 8) {
    validity.valid = false;
    validity.reason = `IP Mask [${maskBits}] is too big for address [${ip.decimal.string}]. Use /8 and smaller (higher amount of bits)`;
    return validity;
  }
  if (firstOctetDec >= 128 && firstOctetDec <= 191 && maskBits < 16) {
    validity.valid = false;
    validity.reason = `IP Mask [${maskBits}] is too big for address [${ip.decimal.string}]. Use /16 and smaller (higher amount of bits)`;
    return validity;
  }
  if (firstOctetDec >= 192 && firstOctetDec <= 223 && maskBits < 24) {
    validity.valid = false;
    validity.reason = `IP Mask [${maskBits}] is too big for address [${ip.decimal.string}]. Use /24 and smaller (higher amount of bits)`;
    return validity;
  }

  return validity;
};

const calculateBroadcastAddress = (ip: IP, mask: Mask): IP => {
  return modifyIPViaMask(ip, mask, "1");
};

const calculateNetworkAddress = (ip: IP, mask: Mask): IP => {
  return modifyIPViaMask(ip, mask, "0");
};

const calculateAmountOfHostsInNetwork = (mask: Mask): number => {
  if (mask.bits === 32 || mask.bits === 31) return 0; //32 is single-host and 31 is point-to-point
  const amount = 2 ** (32 - mask.bits) - 2;
  return amount;
};

const getAffectedOctetsIndexFromMask = (mask: Mask): number => {
  const bits = mask.bits;
  if (bits < 8) return 0;
  if (bits >= 8 && bits < 16) return 1;
  if (bits >= 16 && bits < 24) return 2;
  if (bits >= 24) return 3;
};

const updateFormUI = (ip: string, mask: string): void => {
  const ipInput = document.getElementById("ip") as HTMLInputElement;
  const maskInput = document.getElementById("mask") as HTMLSelectElement;

  ipInput.value = ip;
  maskInput.value = mask;
};

const getIPClass = (ip: IP): "A" | "B" | "C" | "D" | "E" => {
  const firstOctetDec = ip.decimal.octets[0];
  if (firstOctetDec <= 127) return "A";
  if (firstOctetDec <= 191) return "B";
  if (firstOctetDec <= 223) return "C";
  if (firstOctetDec <= 239) return "D";
  if (firstOctetDec <= 255) return "E";
};

const main = async () => {
  try {
    const { ip, mask } = await getParams();
    updateFormUI(ip.decimal.string, mask.bits.toString());
    const validity = checkMaskValidity(ip, mask);
    if (!validity.valid) throw new Error(validity.reason);
    //show selected ip and mask in form input
    const broadcastAddress = calculateBroadcastAddress(ip, mask);
    const networkAddress = calculateNetworkAddress(ip, mask);
    console.log("broadcast", broadcastAddress);
    console.log("network", networkAddress);
    const amountOfHosts = calculateAmountOfHostsInNetwork(mask);
    console.log("hosts", amountOfHosts);
    const IPClass = getIPClass(ip);
    console.log("Class", IPClass);
  } catch (e) {
    alert(e.message);
  }
};

main();
