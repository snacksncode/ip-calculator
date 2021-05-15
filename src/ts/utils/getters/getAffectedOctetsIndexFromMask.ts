import Mask from "../../interfaces/Mask";

const getAffectedOctetsIndexFromMask = (mask: Mask): number => {
  const bits = mask.bits;
  if (bits < 8) return 0;
  if (bits >= 8 && bits < 16) return 1;
  if (bits >= 16 && bits < 24) return 2;
  if (bits >= 24) return 3;
};

export default getAffectedOctetsIndexFromMask;
