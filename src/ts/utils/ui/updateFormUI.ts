const updateFormUI = (ip: string, mask: string): void => {
  const ipInput = document.getElementById("ip") as HTMLInputElement;
  const maskInput = document.getElementById("mask") as HTMLSelectElement;

  ipInput.value = ip;
  maskInput.value = mask;
};

export default updateFormUI;
