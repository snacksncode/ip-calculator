import IP from "../../interfaces/IP";
import Mask from "../../interfaces/Mask";
import UIData from "../../interfaces/UIData";
import getIPClass from "../getters/getIPClass";
import calculateBroadcastAddress from "./calculateBroadcastAddress";
import calculateHosts from "./calculateHosts";
import calculateMinMaxHostAddress from "./calculateLastHostAddress";
import calculateNetworkAddress from "./calculateNetworkAddress";

function calculateData(ip: IP, mask: Mask): UIData {
  const broadcast = calculateBroadcastAddress(ip, mask);
  const network = calculateNetworkAddress(ip, mask);
  const hosts = calculateHosts(mask);
  const ipClass = getIPClass(ip);
  const maxHost = calculateMinMaxHostAddress(broadcast, "max");
  const minHost = calculateMinMaxHostAddress(network, "min");

  const data: UIData = {
    ip,
    mask,
    network,
    broadcast,
    amountOfHosts: hosts,
    ipClass,
    maxHost,
    minHost,
  };

  return data;
}

export default calculateData;
