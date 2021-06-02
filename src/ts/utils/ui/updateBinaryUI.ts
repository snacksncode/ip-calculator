import AddressUIEntry from "../../interfaces/AddressUIEntry";
import IP from "../../interfaces/IP";
import Mask from "../../interfaces/Mask";
import getContainerForAddress from "../getters/getContainerForAddress";
import populateElementWithOctets from "./populateElementWithOctets";

function updateBinaryUI(ip: IP, mask: Mask, network: IP, broadcast: IP, minHost: IP, maxHost: IP) {
  const entries: AddressUIEntry[] = [
    {
      name: "ip",
      data: ip,
    },
    {
      name: "network",
      data: network,
    },
    {
      name: "broadcast",
      data: broadcast,
    },
    {
      name: "min-host",
      data: minHost,
    },
    {
      name: "max-host",
      data: maxHost,
    },
  ];
  for (let entry of entries) {
    const name = entry.name;
    const containerElement = getContainerForAddress(name, "binary");
    const address = entry.data;
    populateElementWithOctets(mask, containerElement, address.binary.octets, true);
  }
  updateUIMaskPosition(mask.bits);
}

function updateUIMaskPosition(bits: number) {
  const maskElement = document.querySelector(".data-entry--binary .mask-split") as HTMLElement;
  let charsOffset = bits;
  if (bits > 24) charsOffset += 3;
  else if (bits > 16) charsOffset += 2;
  else if (bits > 8) charsOffset += 1;

  let transformStyles: string = null;
  if (bits === 32) {
    transformStyles = `translateX(calc(${charsOffset}ch + 1.25rem - 1px))`;
  } else if (bits === 8 || bits === 16 || bits === 24) {
    //mask is splitting octets
    transformStyles = `translateX(calc(${charsOffset}ch + 1.25rem - 1px))`;
  } else {
    //mask is splitting bits inside one of the octets
    transformStyles = `translateX(calc(${charsOffset}ch + 0.5rem - 1px))`;
  }

  maskElement.style.transform = transformStyles;
}

export default updateBinaryUI;
