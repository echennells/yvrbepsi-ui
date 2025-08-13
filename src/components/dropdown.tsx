import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSetChain } from "@web3-onboard/react";

import dropdown from "@/assets/dropdown.svg";
import { useWallets } from "@web3-onboard/react";
import config from "@/constants";
import tokens, { Token } from "@/data/tokens";
import chains, { Chain } from "@/data/chains";
import lightning from "@/data/lightning";

interface TokenWithChain extends Token {
  chain: Chain;
}

interface Props {
  options: TokenWithChain[];
  setToken: (token: string, decimals: number, chainId: string) => void;
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

export default function Dropdown({ options, setToken }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TokenWithChain | string>();
  const [{ connectedChain }, setChain] = useSetChain();

  const toggle = () => {
    setOpen((last) => !last);
  };

  useEffect(() => {
    if (selected && typeof selected !== 'string' && setToken) {
      setToken(selected.address, selected.decimals, selected.chain.id);
    } else if (selected === 'bitcoin' && setToken) {
      setToken('bitcoin', 0, 'bitcoin');
    }
    if (selected && typeof selected !== 'string' && connectedChain && connectedChain.id !== selected.chain.id) {
      setChain({ chainId: selected.chain.id.toString() });
    }
  }, [selected, setToken, connectedChain, setChain]);

  return (
    <div
      className="w-full h-14 border-4 border-background flex relative hover:bg-background"
      onClick={toggle}
    >
      <div className="w-full">
        {selected === undefined ? (
          <p className="text-lg py-2 px-3">select</p>
        ) : selected === 'bitcoin' ? (
          <div className="py-2 px-3 h-12 text-lg flex items-center">
            {lightning.icon} {lightning.displayName}
          </div>
        ) : (
          <NativeOption {...(selected as TokenWithChain)} />
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
        <div
          onClick={() => {
            setSelected('bitcoin');
          }}
          className="py-2 px-3 h-12 text-lg flex items-center hover:bg-background cursor-pointer w-full"
        >
          {lightning.icon} {lightning.displayName}
        </div>
        {Object.values(chains)
          .map((chain) =>
            tokens[chain.id.toString()]?.map((option) => (
              <div
                key={`${option.coinKey}-${option.chainId}`}
                onClick={() => {
                  setSelected({ ...option, chain });
                }}
              >
                <NativeOption {...option} chain={chain} />
              </div>
            )),
          )
          .flat()}
      </div>
    </div>
  );
}
