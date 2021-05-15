import IP from "./IP";

type Mask = IP & {
  bits: number;
};

export default Mask;
