export type Token = {
  address: string;
  chainId: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI: string;
  coinKey: string;
};

const tokens: { [key: string]: Token[] } = {
  "0x2105": [
    {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      chainId: "0x2105",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin",
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
      coinKey: "USDC",
    },
  ],
  "0x65": [
    {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      chainId: "0x65",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin",
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
      coinKey: "USDC",
    },
  ],
  "0x89": [
    {
      address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      chainId: "0x89",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin",
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
      coinKey: "USDC",
    },
    {
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      chainId: "0x89",
      symbol: "USDC.e",
      decimals: 6,
      name: "USD Coin",
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
      coinKey: "USDC.e",
    },
  ],
  "0xa": [
    {
      address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      chainId: "0xa",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin",
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
      coinKey: "USDC",
    },
  ],
  "0xa4b1": [
    {
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      chainId: "0xa4b1",
      symbol: "USDC.e",
      decimals: 6,
      name: "Bridged USDC",
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
      coinKey: "USDC.e",
    },
    {
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      chainId: "0xa4b1",
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin",
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
      coinKey: "USDC",
    },
  ],
};

export default tokens;
