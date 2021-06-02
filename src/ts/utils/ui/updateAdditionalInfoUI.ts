function updateAdditionalInfoUI(ipClass: string, publicState: string, hosts: number) {
  const ipClassContainer = document.querySelector(".address-entry--ip-class .address-value");
  const ipPublicContainer = document.querySelector(".address-entry--is-public .address-value");
  const hostsContainer = document.querySelector(".address-entry--hosts .address-value");
  ipClassContainer.textContent = ipClass;
  ipPublicContainer.textContent = publicState;
  hostsContainer.textContent = hosts.toString();
}

export default updateAdditionalInfoUI;
