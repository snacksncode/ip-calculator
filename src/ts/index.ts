import "../scss/main.scss";
import parseIP from "./utils/parseIP";

const main = () => {
  const ip = "192.168.13.20";
  const parsedIP = parseIP(ip);
  console.log(parsedIP);
};

main();
