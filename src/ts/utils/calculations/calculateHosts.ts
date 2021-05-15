import Mask from "../../interfaces/Mask";

const calculateHosts = (mask: Mask): number => {
  if (mask.bits === 32 || mask.bits === 31) return 0; //32 is single-host and 31 is point-to-point
  const amount = 2 ** (32 - mask.bits) - 2;
  return amount;
};

export default calculateHosts;
