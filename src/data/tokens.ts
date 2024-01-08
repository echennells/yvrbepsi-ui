export type Token = {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  logoURI: string;
  coinKey: string;
};

const tokens: { [key: string]: Token[] } = {
  "137": [
    // {
    //   address: "0x0000000000000000000000000000000000000000",
    //   chainId: 137,
    //   symbol: "MATIC",
    //   decimals: 18,
    //   name: "MATIC",
    //   logoURI:
    //     "https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png",
    //   coinKey: "MATIC",
    // },
    {
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      chainId: 137,
      symbol: "USDC",
      decimals: 6,
      name: "USD Coin",
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
      coinKey: "USDC",
    },
    {
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      chainId: 137,
      symbol: "USDT",
      decimals: 6,
      name: "USDT",
      logoURI:
        "https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png",
      coinKey: "USDT",
    },
    {
      address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
      chainId: 137,
      symbol: "DAI",
      decimals: 18,
      name: "(PoS) DAI Stablecoin",
      logoURI:
        "https://static.debank.com/image/matic_token/logo_url/0x8f3cf7ad23cd3cadbd9735aff958023239c6a063/549c4205dbb199f1b8b03af783f35e71.png",
      coinKey: "DAI",
    },
  ],
};

export default tokens;
