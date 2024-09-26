import { VT323 } from "next/font/google";
import Image from "next/image";
import { useCallback, useState, useEffect, useMemo } from "react";
import { providers, utils, Contract, BigNumber } from "ethers";
import { useSetChain } from "@web3-onboard/react"

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
  const [tokenChainId, setTokenChainId] = useState<string>()
  const [tokenBalance, setTokenBalance] = useState<BigNumber>()
  const [pending, setPending] = useState(false)

  const [{ wallet }, connect] = useConnectWallet();
  const [{connectedChain}, setChain] = useSetChain()

  const insufficientBalance = useMemo(() => tokenBalance && decimals && utils.parseUnits("1", decimals).add(selected).gt(tokenBalance), [tokenBalance, selected, decimals])

  const buy = useCallback(async () => {
    if (
      wallet?.provider !== undefined &&
      address !== undefined &&
      decimals !== undefined && 
      connectedChain !== undefined &&
      connectedChain !== null &&
      tokenChainId !== undefined &&
      setChain !== undefined
    ) {
      setPending(true)
      if (connectedChain.id !== tokenChainId) {
        await setChain({chainId: tokenChainId})
      }
      const signer = new providers.Web3Provider(
        wallet.provider,
        "any"
      ).getSigner();
      const token = new Contract(address, ERC20, signer);
      token
        .transfer(
          config.RECEIVER_ADDRESS,
          +utils.parseUnits("1", decimals) + selected
        ).then(async (tx: any) => {
          await tx.wait()
        })
        .catch(console.error).finally(() => {
          setPending(false)
        })
    }
  }, [selected, wallet, address, decimals, tokenChainId, connectedChain, setChain]);

  useEffect(() => {
      let subscribed = true
    if (
      wallet?.provider !== undefined &&
      wallet?.accounts !== undefined &&
      wallet.accounts.length > 0 &&
      address !== undefined &&
      decimals !== undefined && 
      connectedChain !== undefined &&
      setChain !== undefined && 
      tokenChainId !== undefined
    ) {
        setChain({chainId: tokenChainId}).then(() => {
          const provider = new providers.Web3Provider(
                wallet.provider,
                "any"
          )
          const token = new Contract(address, ERC20, provider);
          token.balanceOf(wallet.accounts[0].address).then((res: any) => {
          if (subscribed) {
            setTokenBalance(res)
          }
          })
        }
        )
    }
      return () => {subscribed = false}
  }, [tokenChainId, connectedChain, setChain, address, decimals, wallet])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      <div className="w-96 aspect-[1/2] bg-dull-blue max-w-full flex flex-col gap-2 background-dull-blue items-center justify-start border-8 border-grey relative">
        <Image src={banner} alt="banner" width={600} height={300} />

        <div className="bg-grey flex flex-col w-full py-2">
          <p className="text-xl">Choose a drink:</p>
          <div className="grid grid-cols-4 grid-flow-row gap-2 pr-12 y-2">
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
            setToken={(address, decimals, chainId) => {
              setAddress(address);
              setDecimals(decimals);
              setTokenChainId(chainId)
            }}
          />
          {
            tokenBalance && 
              <div className="w-full flex justify-between my-1">
                <p>Balance:</p>
                <p>{utils.formatUnits(tokenBalance, decimals)}</p>
              </div>
          }
        </div>

        <div className="w-96 max-w-full mt-auto">
          <button
            className={`text-3xl text-white w-full border-8 p-2 border-background-alt ${insufficientBalance ? "bg-gray-500" : "bg-red"}`}
            disabled={!!insufficientBalance}
            onClick={() => {
              if (wallet) {
                buy();
              } else {
                connect();
              }
            }}
          >
            {!wallet ? "CONNECT" : insufficientBalance ? "Insufficient Balance" : pending ? "SENDING..." : "BUY"}
          </button>
        </div>
      </div>
    </main>
  );
}
