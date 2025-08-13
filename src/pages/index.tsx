import { VT323 } from "next/font/google";
import Image from "next/image";
import { useCallback, useState, useEffect, useMemo } from "react";
import { providers, utils, Contract, BigNumber } from "ethers";
import { useSetChain } from "@web3-onboard/react";

import banner from "@/assets/bepsi-banner.png";
import Dropdown from "@/components/dropdown";
import type { Address } from "@solana/addresses";
import {
  findAssociatedTokenPda,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";
import { useConnectWallet } from "@web3-onboard/react";
import drinks from "@/data/drinks";
import ERC20 from "@/abis/ERC20.json";
import config from "@/constants";

const inter = VT323({ weight: "400", subsets: ["latin-ext"] });

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [address, setAddress] = useState<string>();
  const [decimals, setDecimals] = useState<number>();
  const [tokenChainId, setTokenChainId] = useState<string>();
  const [tokenBalance, setTokenBalance] = useState<BigNumber>();
  const [pending, setPending] = useState(false);
  const [basePrice, setBasePrice] = useState(1);
  const [donation, setDonation] = useState(0);

  const [{ wallet }, connect] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();

  const insufficientBalance = useMemo(
    () =>
      tokenBalance &&
      decimals &&
      utils
        .parseUnits((basePrice + donation).toString(), decimals)
        .add(parseInt(drinks[selected].id, 10))
        .gt(tokenBalance),
    [tokenBalance, selected, decimals, basePrice, donation],
  );

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
      setPending(true);
      if (connectedChain.id !== tokenChainId) {
        await setChain({ chainId: tokenChainId });
      }
      const signer = new providers.Web3Provider(
        wallet.provider,
        "any",
      ).getSigner();
      const token = new Contract(address, ERC20, signer);
      token
        .transfer(
          config.RECEIVER_ADDRESS,
          +utils.parseUnits((basePrice + donation).toString(), decimals) +
            parseInt(drinks[selected].id, 10),
        )
        .then(async (tx: any) => {
          await tx.wait();
        })
        .catch(console.error)
        .finally(() => {
          setPending(false);
        });
    }
  }, [
    selected,
    wallet,
    address,
    decimals,
    tokenChainId,
    connectedChain,
    setChain,
    donation,
    basePrice,
  ]);

  useEffect(() => {
    let subscribed = true;
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
      setChain({ chainId: tokenChainId }).then(() => {
        const provider = new providers.Web3Provider(wallet.provider, "any");
        const token = new Contract(address, ERC20, provider);
        token.balanceOf(wallet.accounts[0].address).then((res: any) => {
          if (subscribed) {
            setTokenBalance(res);
          }
        });
      });
    }
    return () => {
      subscribed = false;
    };
  }, [tokenChainId, connectedChain, setChain, address, decimals, wallet]);
  const isSolana = tokenChainId === "0x65";
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      <div className="w-96 aspect-[1/2] bg-dull-blue max-w-full flex flex-col gap-2 background-dull-blue items-center justify-start border-8 border-grey relative">
        <Image src={banner} alt="banner" width={600} height={300} />

        <div className="bg-grey flex flex-col w-full py-2">
          <p className="text-xl">Choose a drink:</p>
          <div className="grid grid-cols-3 grid-flow-row gap-2">
            {drinks.map(({ id, name, color, price }, index) => (
              <button
                key={id}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setSelected(index);
                  setBasePrice(price);
                }}
                className={`h-8 text-md text-white ${
                  selected === index ? "border-background-alt border-4" : ""
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-grey flex flex-col w-full py-2">
          <p className="text-xl">Donation:</p>
          <div className="grid grid-cols-4 grid-flow-row gap-2 pr-12 y-2">
            {[0, 2, 4].map((val) => (
              <button
                key={val}
                onClick={() => setDonation(val)}
                className={`h-8 text-md text-black ${
                  donation === val
                    ? "border-background-alt border-4"
                    : "border-gray-400 border-4"
                }`}
              >
                {basePrice + val}
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
              setTokenChainId(chainId);
            }}
          />
          {tokenBalance && (
            <div className="w-full flex justify-between my-1">
              <p>Balance:</p>
              <p>{utils.formatUnits(tokenBalance, decimals)}</p>
            </div>
          )}
        </div>

        <div className="w-96 max-w-full mt-auto">
          <button
            className={`text-3xl text-white w-full border-8 p-2 border-background-alt ${
              !isSolana && insufficientBalance ? "bg-gray-500" : "bg-red"
            }`}
            disabled={!isSolana && !!insufficientBalance}
            onClick={() => {
              if (isSolana) {
                // FIXME: When the treasury account is off-curve (as it is here, because it's a
                // Squads multisig) certain wallets will reject this payment request. As of this
                // writing those include Backpack and Solflare. To hack around this, we derive the
                // address of the associated token account and use it as the recipient, even though
                // this is a violation of the Solana Pay specification.
                findAssociatedTokenPda({
                  mint: address as Address,
                  owner: config.SOLANA_TREASURY_ADDRESS as Address,
                  tokenProgram: TOKEN_PROGRAM_ADDRESS,
                }).then(([tokenAccountAddress]) => {
                  const solanaPayUrl =
                    `solana:${tokenAccountAddress}` +
                    `?amount=${(basePrice + donation).toString()}` +
                    `&spl-token=${address}` +
                    "&label=YVR%20Bepsi" +
                    `&message=One%20${encodeURIComponent(
                      drinks[selected].name
                    )}%20Bepsi` +
                    `&memo=YVR-BEPSI:0:${drinks[selected].id}`;
                  window.location.href = solanaPayUrl;
                });
              } else if (wallet) {
                buy();
              } else {
                connect();
              }
            }}
          >
            {isSolana ? (
              <>
                PAY WITH{" "}
                <Image
                  alt="Solana"
                  className="align-text-bottom inline"
                  src="/solanaPayLogoMarkWhite.svg"
                  height={30}
                  width={80}
                />
              </>
            ) : !wallet ? (
              "CONNECT"
            ) : insufficientBalance ? (
              "Insufficient Balance"
            ) : pending ? (
              "SENDING..."
            ) : (
              "BUY"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
