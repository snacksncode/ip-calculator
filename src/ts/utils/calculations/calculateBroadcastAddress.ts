import IP from "../../interfaces/IP";
import Mask from "../../interfaces/Mask";
import modifyIPViaMask from "./modifyIPViaMask";

const calculateBroadcastAddress = (ip: IP, mask: Mask): IP => {
  return modifyIPViaMask(ip, mask, "1");
};

export default calculateBroadcastAddress;
