import IP from "../../interfaces/IP";
import Mask from "../../interfaces/Mask";
import MaskValidity from "../../interfaces/MaskValidity";

const checkMaskToIPValidity = (ip: IP, mask: Mask): MaskValidity => {
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

export default checkMaskToIPValidity;
