import UIData from "../../interfaces/UIData";
import getAddressPublicState from "../getters/getAddressPublicState";
import updateAdditionalInfoUI from "./updateAdditionalInfoUI";
import updateBinaryUI from "./updateBinaryUI";
import updateDecimalUI from "./updateDecimalUI";
import updateEnteredDataUI from "./updateEnteredDataUI";

function updateUI(data: UIData) {
  const { ip, mask, network, broadcast, minHost, maxHost, amountOfHosts, ipClass } = data;
  updateEnteredDataUI(ip, mask);
  updateDecimalUI(mask, network, broadcast, minHost, maxHost);
  updateBinaryUI(ip, mask, network, broadcast, minHost, maxHost);
  updateAdditionalInfoUI(ipClass, getAddressPublicState(ip).comment, amountOfHosts);
}

export default updateUI;
