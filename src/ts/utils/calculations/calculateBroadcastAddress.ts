import IP from "../../interfaces/IP";
import Mask from "../../interfaces/Mask";
import modifyIPViaMask from "./modifyIPViaMask";

const calculateBroadcastAddress = (ip: IP, mask: Mask): IP => {
  const broadcastAddress = modifyIPViaMask(ip, mask, "1");
  return broadcastAddress;
};

export default calculateBroadcastAddress;
