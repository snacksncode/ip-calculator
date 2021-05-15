export default interface IP {
  decimal: {
    string: string;
    octets: number[];
  };
  binary: {
    string: string;
    octets: string[];
  };
}
