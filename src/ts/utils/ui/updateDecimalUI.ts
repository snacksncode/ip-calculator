import AddressUIEntry from "../../interfaces/AddressUIEntry";
import IP from "../../interfaces/IP";
import Mask from "../../interfaces/Mask";
import getContainerForAddress from "../getters/getContainerForAddress";
import populateElementWithOctets from "./populateElementWithOctets";

function updateDecimalUI(mask: Mask, network: IP, broadcast: IP, minHost: IP, maxHost: IP) {
  const entries: AddressUIEntry[] = [
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
    const containerElement = getContainerForAddress(name, "decimal");
    const address = entry.data;
    populateElementWithOctets(mask, containerElement, address.decimal.octets);
  }
}

export default updateDecimalUI;
