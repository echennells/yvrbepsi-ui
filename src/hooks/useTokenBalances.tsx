import { useQuery } from "@tanstack/react-query";
import { useSetChain, useWallets } from "@web3-onboard/react";

interface TokenBalance {
  balance: string;
  decimals: number;
  logo: string | null;
  name: string;
  possible_spam: boolean;
  symbol: string;
  thumbnail: string | null;
  token_address: string;
  chain: string;
}

export function useTokenBalances() {
  const wallets = useWallets();
  const [{ chains }] = useSetChain();

  const { data } = useQuery({
    queryKey: [wallets?.[0]?.accounts?.[0]?.address, chains],
    queryFn: async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": process.env.NEXT_PUBLIC_MORALIS_API_KEY ?? "",
        },
      };

      return Promise.all(
        chains.map((chain) =>
          fetch(
            `https://deep-index.moralis.io/api/v2/${wallets[0].accounts[0].address}/erc20?chain=${chain.id}`,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              if (response.message) return [];
              return response.map((token: any) => ({
                ...token,
                chain: chain.id,
              })) as TokenBalance[];
            })
        )
      );
    },
    enabled: !!wallets?.[0]?.accounts?.[0]?.address,
  });

  return data?.flat()?.filter((token) => !token.possible_spam);
}
