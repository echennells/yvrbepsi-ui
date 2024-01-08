export interface Chain {
  id: number;
  token: string;
  label: string;
  rpcUrl: string;
  logoURI: string;
}

const chains: { [key: string]: Chain } = {
  "137": {
    id: 137,
    token: "MATIC",
    label: "Polygon",
    rpcUrl: "https://polygon.llamarpc.com",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
  },
};

export default chains;
