import "../scss/main.scss";
import calculateBroadcastAddress from "./utils/calculations/calculateBroadcastAddress";
import calculateHosts from "./utils/calculations/calculateHosts";
import calculateNetworkAddress from "./utils/calculations/calculateNetworkAddress";
import checkMaskToIPValidity from "./utils/general/checkMaskToIPValidity";
import getIPClass from "./utils/getters/getIPClass";
import getParams from "./utils/getters/getParams";
import updateFormUI from "./utils/ui/updateFormUI";

const main = async () => {
  try {
    const { ip, mask } = await getParams();
    updateFormUI(ip.decimal.string, mask.bits.toString());
    const validity = checkMaskToIPValidity(ip, mask);
    if (!validity.valid) throw new Error(validity.reason);
    //show selected ip and mask in form input
    const broadcastAddress = calculateBroadcastAddress(ip, mask);
    const networkAddress = calculateNetworkAddress(ip, mask);
    console.log("broadcast", broadcastAddress);
    console.log("network", networkAddress);
    const amountOfHosts = calculateHosts(mask);
    console.log("hosts", amountOfHosts);
    const IPClass = getIPClass(ip);
    console.log("Class", IPClass);
  } catch (e) {
    alert(e.message);
  }
};

main();
