import IP from "./IP";
import Mask from "./Mask";

export default interface UIData {
  ip: IP;
  mask: Mask;
  network: IP;
  broadcast: IP;
  minHost: IP;
  maxHost: IP;
  amountOfHosts: number;
  ipClass: string;
}
