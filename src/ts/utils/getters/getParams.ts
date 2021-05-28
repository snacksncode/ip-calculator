import IP from "../../interfaces/IP";
import Params from "../../interfaces/Params";
import parseIP from "../general/parseIP";
import parseURLParams from "../general/parseURLParams";
import getMaskFromBits from "./getMaskFromBits";
import getUserIP from "./getUserIP";

const getParams = async (): Promise<Params> => {
  const rawParams = parseURLParams();
  //check if both parameters were passed
  if (!rawParams.hasOwnProperty("ip") || !rawParams.hasOwnProperty("mask"))
    throw new Error("Missing IP or MASK parameters");
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

export default getParams;
