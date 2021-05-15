import IP from "../../interfaces/IP";

const getIPClass = (ip: IP): "A" | "B" | "C" | "D" | "E" => {
  const firstOctetDec = ip.decimal.octets[0];
  if (firstOctetDec <= 127) return "A";
  if (firstOctetDec <= 191) return "B";
  if (firstOctetDec <= 223) return "C";
  if (firstOctetDec <= 239) return "D";
  if (firstOctetDec <= 255) return "E";
};

export default getIPClass;
