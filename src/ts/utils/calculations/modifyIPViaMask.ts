import IP from "../../interfaces/IP";
import Mask from "../../interfaces/Mask";
import binToDec from "../converters/binToDec";
import getAffectedOctetsIndexFromMask from "../getters/getAffectedOctetsIndexFromMask";
import nearestMultiple from "./nearestMultiple";

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

export default modifyIPViaMask;
