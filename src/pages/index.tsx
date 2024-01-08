import { VT323 } from "next/font/google";
import Image from "next/image";
import { useCallback, useState } from "react";
import { providers, utils, Contract } from "ethers";

import banner from "@/assets/bepsi-banner.png";
import Dropdown from "@/components/dropdown";
import { useConnectWallet } from "@web3-onboard/react";
import drinks from "@/data/drinks";
import ERC20 from "@/abis/ERC20.json";
import config from "@/constants";

const inter = VT323({ weight: "400", subsets: ["latin-ext"] });

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [address, setAddress] = useState<string>();
  const [decimals, setDecimals] = useState<number>();

  const [{ wallet }, connect] = useConnectWallet();

  const buy = useCallback(async () => {
    if (
      wallet?.provider !== undefined &&
      address !== undefined &&
      decimals !== undefined
    ) {
      const signer = new providers.Web3Provider(
        wallet.provider,
        "any"
      ).getSigner();
      const token = new Contract(address, ERC20, signer);
      token
        .transfer(
          config.RECEIVER_ADDRESS,
          +utils.parseUnits("1", decimals) + selected
        )
        .catch(console.error);
    }
  }, [selected, wallet, address, decimals]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      <div className="w-96 aspect-[1/2] bg-dull-blue max-w-full flex flex-col gap-2 background-dull-blue items-center justify-start border-8 border-grey relative">
        <Image src={banner} alt="banner" width={600} height={300} />

        <div className="bg-grey flex flex-col w-full py-2">
          <p className="text-xl">choose a drink:</p>
          <div className="grid grid-cols-4 grid-flow-row gap-2 pr-16 y-2">
            {drinks.map(({ id, name, color }, index) => (
              <button
                key={id}
                style={{ backgroundColor: color }}
                onClick={() => setSelected(index)}
                className={`h-8 text-md text-white ${
                  selected === index ? "border-background-alt border-4" : ""
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-grey w-full">
          <p className="text-xl py-2">Choose a payment:</p>
          <Dropdown
            options={[]}
            setToken={(address, decimals) => {
              setAddress(address);
              setDecimals(decimals);
            }}
          />
        </div>

        <div className="w-96 max-w-full mt-auto">
          <button
            className="text-3xl text-white w-full border-8 p-2 border-background-alt bg-red"
            onClick={() => {
              if (wallet) {
                buy();
              } else {
                connect();
              }
            }}
          >
            {!wallet ? "CONNECT" : "BUY"}
          </button>
        </div>
      </div>
    </main>
  );
}
