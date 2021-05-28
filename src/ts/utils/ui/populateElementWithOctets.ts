import Mask from "../../interfaces/Mask";
import removeAllChildNodes from "../general/removeAllChildNodes";
import nearestMultiple from "../calculations/nearestMultiple";
import getAffectedOctetsIndexFromMask from "../getters/getAffectedOctetsIndexFromMask";

function populateElementWithOctets(
  mask: Mask,
  containerElement: HTMLElement,
  octets: Array<string | number>,
  isPopulatingBinary = false
) {
  //clear any children within container element
  removeAllChildNodes(containerElement);
  //get the index of first octet that is affected
  const affectedOctetsFromIndex = getAffectedOctetsIndexFromMask(mask);

  if (!isPopulatingBinary) {
    populateWithoutSplit(octets, affectedOctetsFromIndex, containerElement);
    return;
  }
  const maskBits = mask.bits;
  if (maskBits === 8 || maskBits === 16 || maskBits === 24) {
    populateWithoutSplit(octets, affectedOctetsFromIndex, containerElement, {
      status: true,
      index: affectedOctetsFromIndex,
    });
    return;
  }

  populateWithSplit(mask, octets, affectedOctetsFromIndex, containerElement);
}

function populateWithoutSplit(
  octets: Array<string | number>,
  affectedFromIndex: number,
  container: HTMLElement,
  splitOctet = { status: false, index: 0 }
) {
  octets.forEach((octet, index) => {
    const isAffected = index >= affectedFromIndex;
    const octetElement = document.createElement("div");
    let classesToAdd = [];
    if (isAffected) classesToAdd.push("octet--affected");
    if (splitOctet.status && index === splitOctet.index) classesToAdd.push("octet--mask-split");
    classesToAdd.push("octet");
    octetElement.classList.add(...classesToAdd);
    const octetText = document.createTextNode(octet.toString());

    //place all the stuff together
    octetElement.appendChild(octetText);
    container.appendChild(octetElement);
  });
}

function populateWithSplit(
  mask: Mask,
  octets: Array<string | number>,
  affectedFromIndex: number,
  container: HTMLElement
) {
  console.log("populateWithSplit()");
  octets.forEach((octet, index) => {
    console.log(`Octets.forEach() => ${octet} [${index}]`);
    const isAffected = index >= affectedFromIndex;
    const isSplitted = index === affectedFromIndex;
    const octetElement = document.createElement("div");
    const classesToAdd: string[] = [];
    if (isAffected) classesToAdd.push("octet--affected");
    if (isSplitted) classesToAdd.push("octet--splitted");
    classesToAdd.push("octet");
    octetElement.classList.add(...classesToAdd);

    if (!isSplitted) {
      const octetText = document.createTextNode(octet.toString());

      //place all the stuff together
      octetElement.appendChild(octetText);
      container.appendChild(octetElement);
      return;
    }

    const bits = octet.toString().split("");
    const closestOctetEnd = nearestMultiple(mask.bits, 8);
    const affectedSinceBit = closestOctetEnd - mask.bits === 0 ? 0 : 8 - (closestOctetEnd - mask.bits);
    bits.forEach((bit, index) => {
      const bitElement = document.createElement("div");
      const bitText = document.createTextNode(bit);
      const isAffected = index >= affectedSinceBit;
      const isSplitted = index === affectedSinceBit;
      const classesToAdd: string[] = [];
      if (isAffected) classesToAdd.push("bit--affected");
      if (isSplitted) classesToAdd.push("bit--splitted");
      classesToAdd.push("bit");
      bitElement.classList.add(...classesToAdd);

      bitElement.appendChild(bitText);
      octetElement.appendChild(bitElement);
    });
    container.appendChild(octetElement);
  });
}

export default populateElementWithOctets;
