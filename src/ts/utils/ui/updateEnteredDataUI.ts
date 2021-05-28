import IP from "../../interfaces/IP";
import Mask from "../../interfaces/Mask";

const updateEnteredDataUI = (ip: IP, mask: Mask): void => {
  const ipAddr = ip.decimal.string;
  const maskAddr = mask.decimal.string;
  const ipSpan = document.querySelector(".address-entry--ip .address-value") as HTMLSpanElement;
  const maskSpan = document.querySelector(".address-entry--mask .address-value") as HTMLSpanElement;

  ipSpan.textContent = ipAddr;
  maskSpan.innerHTML = `${maskAddr}<span class="address-bits">/${mask.bits}</span>`;
};

export default updateEnteredDataUI;
