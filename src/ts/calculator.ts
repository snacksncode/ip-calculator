import "../scss/main.scss";
import IP from "./interfaces/IP";
import Mask from "./interfaces/Mask";
import calculateData from "./utils/calculations/calculateData";
import checkMaskToIPValidity from "./utils/general/checkMaskToIPValidity";
import getParams from "./utils/getters/getParams";
import updateUI from "./utils/ui/updateUI";

const main = async () => {
  try {
    const { ip, mask } = await getParams();
    calculateAndUpdateUI(ip, mask);
  } catch (e) {
    alert(e.message);
  }
};

function calculateAndUpdateUI(ip: IP, mask: Mask) {
  try {
    const validity = checkMaskToIPValidity(ip, mask);
    if (!validity.valid) throw new Error(validity.reason);
    //show selected ip and mask in form input
    const calculatedData = calculateData(ip, mask);
    updateUI(calculatedData);
  } catch (e) {
    alert(e.message);
  }
}

main();
