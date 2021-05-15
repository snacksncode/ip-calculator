import IP from "../../interfaces/IP";
import Mask from "../../interfaces/Mask";
import modifyIPViaMask from "./modifyIPViaMask";

const calculateNetworkAddress = (ip: IP, mask: Mask): IP => {
  return modifyIPViaMask(ip, mask, "0");
};

export default calculateNetworkAddress;
