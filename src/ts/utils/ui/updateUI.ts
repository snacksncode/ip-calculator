import UIData from "../../interfaces/UIData";
import updateBinaryUI from "./updateBinaryUI";
import updateDecimalUI from "./updateDecimalUI";
import updateEnteredDataUI from "./updateEnteredDataUI";

function updateUI(data: UIData) {
  const { ip, mask, network, broadcast, minHost, maxHost, amountOfHosts: _hosts, ipClass: _class } = data;
  updateEnteredDataUI(ip, mask);
  updateDecimalUI(mask, network, broadcast, minHost, maxHost);
  updateBinaryUI(mask, network, broadcast, minHost, maxHost);
}

export default updateUI;
