import "../scss/main.scss";
import calculateBroadcastAddress from "./utils/calculations/calculateBroadcastAddress";
import calculateHosts from "./utils/calculations/calculateHosts";
import calculateMinMaxHostAddress from "./utils/calculations/calculateLastHostAddress";
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
    const amountOfHosts = calculateHosts(mask);
    const IPClass = getIPClass(ip);
    const maxHost = calculateMinMaxHostAddress(broadcastAddress, "max");
    const minHost = calculateMinMaxHostAddress(networkAddress, "min");

    console.info("Broadcast:", broadcastAddress);
    console.info("Network:", networkAddress);
    console.info("Hosts:", amountOfHosts);
    console.info("IP Class:", IPClass);
    console.info("Max Host:", maxHost);
    console.info("Min Host:", minHost);
  } catch (e) {
    alert(e.message);
  }
};

main();
