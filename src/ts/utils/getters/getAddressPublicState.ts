import IP from "../../interfaces/IP";
import PublicState from "../../interfaces/PublicState";

function getAddressPublicState(address: IP): PublicState {
  const state: PublicState = {
    isPublic: true,
    comment: "Yes",
  };
  if (address.decimal.octets[0] === 192 && address.decimal.octets[1] === 168) {
    state.isPublic = false;
    state.comment = "No, Private network 192.168.x.x";
  }
  if (address.decimal.octets[0] === 172 && address.decimal.octets[1] >= 16 && address.decimal.octets[1] <= 31) {
    state.isPublic = false;
    state.comment = "No, Private network 172.16-31.x.x";
  }
  if (address.decimal.octets[0] === 10) {
    state.isPublic = false;
    state.comment = "No, Private network 10.x.x.x";
  }
  if (address.decimal.octets[0] === 127) {
    state.isPublic = false;
    state.comment = "No, Loopback network 127.x.x.x";
  }
  return state;
}

export default getAddressPublicState;
