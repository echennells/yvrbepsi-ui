export interface Chain {
  id: string;
  token: string;
  label: string;
  rpcUrl: string;
  logoURI: string;
}

const chains: { [key: string]: Chain } = {
  "0x2105": {
    id: "0x2105",
    token: "ETH",
    label: "Base",
    rpcUrl: "https://base.llamarpc.com",
    logoURI:
      "https://github.com/base-org/brand-kit/raw/main/logo/in-product/Base_Network_Logo.svg",
  },
  "0xa": {
    id: "0xa",
    token: "ETH",
    label: "Optimism",
    rpcUrl: "https://optimism.llamarpc.com",
    logoURI:
      "https://optimistic.etherscan.io/assets/optimism/images/svg/logos/token-secondary-light.svg",
  },
  "0x89": {
    id: "0x89",
    token: "POLY",
    label: "Polygon",
    rpcUrl: "https://polygon.llamarpc.com",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
  },
  "0xa4b1": {
    id: "0xa4b1",
    token: "ETH",
    label: "Arbitrum One",
    rpcUrl: "https://arbitrum.llamarpc.com",
    logoURI:
      "https://arbiscan.io/assets/arbitrum/images/svg/logos/token-secondary-light.svg?v=24.9.2.0",
  },
};

export default chains;
