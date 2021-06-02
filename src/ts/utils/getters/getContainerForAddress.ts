import AddressUIName from "../../interfaces/AddressUIName";

type ContainerType = "binary" | "decimal";

function getContainerForAddress(addressName: AddressUIName, type: ContainerType): HTMLElement {
  switch (addressName) {
    case "ip":
      return document.querySelector(`.data-entry--binary .address-entry--binary-ip .address-value`);
    case "network":
      return document.querySelector(`.data-entry--${type} .address-entry--network .address-value`);
    case "broadcast":
      return document.querySelector(`.data-entry--${type} .address-entry--broadcast .address-value`);
    case "min-host":
      return document.querySelector(`.data-entry--${type} .address-entry--min-host .address-value`);
    case "max-host":
      return document.querySelector(`.data-entry--${type} .address-entry--max-host .address-value`);
  }
}

export default getContainerForAddress;
