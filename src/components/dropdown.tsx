import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import dropdown from "@/assets/dropdown.svg";
import { useWallets } from "@web3-onboard/react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import config from "@/constants";
import { useLifiConnections } from "@/hooks/useLifiConnections";
import tokens, { Token } from "@/data/tokens";
import chains, { Chain } from "@/data/chains";

interface Route {
  coinKey: string;
  symbol: string;
  logoURI: string;
  priceUSD: string;
  address: string;
  decimals: number;
  chain: {
    name: string;
    logoURI: string;
  };
}

interface TokenWithChain extends Token {
  chain: Chain;
}

interface Props {
  options: Route[];
  setToken: (token: string, decimals: number) => void;
}

function NativeOption({ symbol, logoURI, chain }: TokenWithChain) {
  return (
    <div className="py-2 px-3 h-12 text-lg flex items-center hover:bg-background cursor-pointer w-full">
      <Image
        src={logoURI}
        alt={symbol}
        width={25}
        height={25}
        className="object-contain mx-2 rounded-full"
      />{" "}
      {symbol} on
      <Image
        src={chain?.logoURI}
        alt={chain?.label}
        width={25}
        height={25}
        className="object-contain mx-2"
      />{" "}
      {chain?.label}
    </div>
  );
}

function LifiOption({ coinKey, symbol, logoURI, chain, priceUSD }: Route) {
  return (
    <div className="py-2 px-3 h-12 text-lg flex items-center hover:bg-background cursor-pointer w-full">
      {" "}
      ~{(1 / +priceUSD).toFixed(2)}{" "}
      <Image
        src={logoURI}
        alt={symbol}
        width={25}
        height={25}
        className="object-contain mx-2"
      />{" "}
      {symbol} on{" "}
      <Image
        src={chain?.logoURI}
        alt={chain?.name}
        width={25}
        height={25}
        className="object-contain mx-2"
      />{" "}
      {chain?.name}
    </div>
  );
}

export default function Dropdown({ options, setToken }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Route | TokenWithChain>();
  const [selectedNative, setSelectedNative] = useState(false);

  const connections = useLifiConnections();
  const balances = useTokenBalances();

  const toggle = () => {
    setOpen((last) => !last);
  };

  useEffect(() => {
    if (selected && setToken) {
      setToken(selected.address, selected.decimals);
    }
  }, [selected, setToken]);

  return (
    <div
      className="w-full h-14 border-4 border-background flex relative hover:bg-background"
      onClick={toggle}
    >
      <div className="w-full">
        {selected === undefined ? (
          <p className="text-lg py-2 px-3">select</p>
        ) : selectedNative ? (
          <NativeOption {...(selected as TokenWithChain)} />
        ) : (
          <LifiOption {...(selected as Route)} />
        )}
      </div>
      <Image
        src={dropdown}
        className={`ml-auto mr-3 ${open ? "rotate-180" : ""}`}
        width={15}
        height={20}
        alt="dropdown"
      />
      <div
        className={`${
          open ? "border-4" : "h-0 border-0"
        } overflow-hidden absolute top-12 -ml-1 -mr-1 left-0 right-0 bg-grey w-[calc(100% + 2px)] border-background`}
      >
        {Object.values(chains)
          .map((chain) =>
            tokens[chain.id.toString()].map((option) => (
              <div
                key={`${option.coinKey}-${option.chainId}`}
                onClick={() => {
                  setSelectedNative(true);
                  setSelected({ ...option, chain });
                }}
              >
                <NativeOption {...option} chain={chain} />
              </div>
            ))
          )
          .flat()}
        {options.map((option) => (
          <div
            key={`${option.coinKey}-${option.chain.name}`}
            onClick={() => {
              setSelectedNative(false);
              setSelected(option);
            }}
          >
            <LifiOption {...option} />
          </div>
        ))}
      </div>
    </div>
  );
}
