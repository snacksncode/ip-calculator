async function text(url: string) {
  return fetch(url).then((res) => res.text());
}

const getUserIP = async () => {
  const data = await text("https://www.cloudflare.com/cdn-cgi/trace");
  console.info("Getting user ip...");
  let ipRegex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
  let ip = data.match(ipRegex)[0];
  return ip;
};

export default getUserIP;
